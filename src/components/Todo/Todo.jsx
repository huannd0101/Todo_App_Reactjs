import React from "react";
import './style.scss';
import AddTodo from '../AddTodo/AddTodo';
import {toast} from 'react-toastify';


class Todo extends React.Component {
    state = {
        todos: [
            
        ],
        editTodo: {},
        temp: {}
    }

    addNewTodo = (todo) => {
        this.setState({
            todos: [...this.state.todos, todo]
        })
        //success
        toast.success("Add thành công");
    }

    handleEdit = (item) => {
        this.setState({
            editTodo: item,
            temp: item
        });
    }

    handleDelete = (item) => {
        let newTodos = this.state.todos.filter((i) => {
            if(i.id !== item.id) {
                return i;
            }
        })
        this.setState({
            todos: newTodos
        })

        toast.success("Xóa thành công!")

        if(newTodos.length === 0){
            toast.info("Danh sách trống");
        }
    }

    onChangeTodoHandle = (e) => {
        this.setState({
            editTodo: {
                title: e.target.value
            }
        })
    }

    handleSave = (item) => {
        if(!this.state.editTodo.title){
            toast.error("Bạn chưa nhập todo");
            return;
        }

        let newTodos = this.state.todos.filter((i) => {
            if(i.id === item.id) {
                return i.title = this.state.editTodo.title;
            }
            return i;
        })
        console.log(newTodos);

        this.setState({
            todos: newTodos,
            editTodo: {}, 
            temp: {}
        })

        toast.success("Sửa thành công!");
    }

    keyUpHandle = (e, item) => {
        if(e.keyCode === 13){
            this.handleSave(item)
        }
        if(e.keyCode === 27) {
            this.setState({
                editTodo: {}, 
                temp: {}
            })
        }
    }

    render() {
        const {editTodo} = this.state;
        const {todos} = this.state;
        const {temp} = this.state;

        return (
            <div className="list-todo">

                <AddTodo addNewTodo={this.addNewTodo}/>

                <div className="list-box">
                    {todos && todos.length > 0 && 
                        todos.map((item, index) => {
                        return (
                            <div className="box" key={item.id}>
                                {
                                    temp && temp.id === item.id && 
                                    <>
                                        <input 
                                            id="inp"
                                            type="text" 
                                            onChange={(e) => this.onChangeTodoHandle(e)} 
                                            value={editTodo.title} 
                                            onKeyUp={(e) => this.keyUpHandle(e, item)}
                                            autoFocus
                                        /> 
                                        <button className='btn-edit' onClick={() => this.handleSave(item)}>Save</button>
                                    </>
                                }
                                {
                                    temp !== item && 
                                    <> 
                                        <span>{index + 1}. {item.title}</span> 
                                        <button className='btn-edit' onClick={() => this.handleEdit(item)}>Edit</button> 
                                    </>
                                }
                                
                                <button className='btn-delete' onClick={() => this.handleDelete(item)}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Todo;