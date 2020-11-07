import React from 'react'
import './TodoList.css';
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";

function TodoList(props) {
    // console.log('props: ', props);
    return (
    <div className="TodoList">

        <List className={"todo__list"}>
            <ListItem>
                {/*<ListItemAvatar  children={"hi"}/>*/}
                <ListItemText
                    primary={props.taskName}
                    secondary={ // use ternary operator to sync with db ;)
                        props.taskCreatedDate ?
                            "Created: " + props.taskCreatedDate.toDate().toString().substr(0, 15) :
                            "Could not fetch date :("
                    }
                />
            </ListItem>
        </List>

    </div>
  )
}

export default TodoList
