import React from "react";
import '../Todo/style.scss';
import {toast} from 'react-toastify';

class Todo extends React.Component {
    state = {
        title: ''
    }

    onchangeTitleHandle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onClickHandle = () => {
        if(!this.state.title){
            //title is empty
            toast.error("Thêm thất bại");
            return;
        }
        let todo = {
            id: Math.floor(Math.random() * 10000),
            title: this.state.title
        }
        this.props.addNewTodo(todo);

        this.setState({
            title: ''
        })
    }

    keyUpHandle = (e) => {
        if(e.keyCode === 13) {
            this.onClickHandle()
        }
        if(e.keyCode === 27) {
            this.setState({
                title: ''
            })
        }
    }

    render() {
        let {title} = this.state;
        return (
            <div className="list-todo">
                <div className="add-todo">
                    <input type="text" 
                        value={title} 
                        onChange={(e) => this.onchangeTitleHandle(e)} 
                        onKeyUp={(e) => this.keyUpHandle(e)}
                    /> 
                    <button onClick={() => this.onClickHandle()} className="btn-add">Add</button>
                </div>
            </div>
        );
    }
}

export default Todo;