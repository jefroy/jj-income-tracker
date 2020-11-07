import React from 'react'
import './TodoList.css';

function TodoList(props) {
    return (
    <div className="TodoList">
        <li>{props.taskName}</li>
    </div>
  )
}

export default TodoList
