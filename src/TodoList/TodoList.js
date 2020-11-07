import React, {useState} from 'react'
import './TodoList.css';
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import db from '../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from "@material-ui/core/Modal";
import EditIcon from '@material-ui/icons/Edit';

function TodoList(props) {
    // console.log('props: ', props);
    const [open, setOpen] = useState(false);

    function handleClose() {
        setOpen(false);
    }
    function handleOpen() {
        setOpen(true);
    }

    return (
    <div className="TodoList">

        <> {/* <> is a react fragment */}
        <Modal
            open={open} // state to determine if the modal is open or not
            onClose={handleClose} // function to handle closing the modal
            // children={}
        >
            <div>
                <h1>i am modal</h1>
                <button onClick={event => setOpen(false)}/>
            </div>
        </Modal>

        <List className={"todo__list"}>
            <ListItem>
                {/*<ListItemAvatar  children={"hi"}/>*/}
                <ListItemText
                    primary={props.taskName}
                    secondary={ // use ternary operator to sync with db ;)
                        props.taskCreatedDate ?
                            "✅Created: " + props.taskCreatedDate.toDate().toString().substr(0, 15) :
                            "❌Could not fetch date 😢"
                    }
                />
            </ListItem>
            <EditIcon type="button" onClick={event => handleOpen()}/>
            <DeleteIcon onClick={event => db.collection('todos').doc(props.id).delete()}/>
        </List>
        </>

    </div>
  )
}

export default TodoList
