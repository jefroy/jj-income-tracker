import React from 'react'
import './TodoList.css';
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

function TodoList(props) {
    return (
    <div className="TodoList">

        <List className={"todo__list"}>
            <ListItem>
                <ListItemAvatar></ListItemAvatar>
                <ListItemText primary={props.taskName} secondary={"Due: xx/xx/xx"} />
            </ListItem>
        </List>

    </div>
  )
}

export default TodoList
