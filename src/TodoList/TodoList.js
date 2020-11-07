import React, {useState} from 'react'
import './TodoList.css';
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import db from '../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from "@material-ui/core/Modal";
import EditIcon from '@material-ui/icons/Edit';
import makeStyles from "@material-ui/core/styles/makeStyles";
import firebase from "firebase";

function TodoList(props) {
    // console.log('props: ', props);

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    function handleClose() {
        setOpen(false);
    }
    function handleOpen() {
        setOpen(true);
    }
    function updateToDo(){
        // update taskname with new text
        db.collection('todos').doc(props.id).set({
            taskName: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, {
            merge: true // prevent overriding existing data
        })
        handleClose();
    }

    // styles hook https://www.positronx.io/create-react-modal-popup-with-material-ui/
    const useStyles = makeStyles(theme => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            position: 'absolute',
            width: 450,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();
    return (
    <div className="TodoList">

        <> {/* <> is a react fragment */}
        <Modal
            className={classes.paper}
            open={open} // state to determine if the modal is open or not
            onClose={handleClose} // function to handle closing the modal
            // children={}
        >
            <div>
                <h1>Edit Task</h1>
                <input
                    type="text"
                    value={input}
                    onChange={event => setInput(event.target.value)}
                    placeholder={props.taskName}
                />
                <Button onClick={event => updateToDo()}>Update Task</Button>
            </div>
        </Modal>

        <List className={"todo__list"}>
            <ListItem>
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
