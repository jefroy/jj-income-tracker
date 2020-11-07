import './App.css';
import React, {useEffect, useState} from "react";
import { Button } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TodoList from "./TodoList/TodoList";
import db from "./firebase";
import firebase from "firebase";

function App() {
    // states -> update live on the page
    const [
        todos, // state variable
        setTodos // state variable setter
    ] = useState([]); // start as an empty array
    const [input, setInput] = useState('');
    // console.log(input);
    /*
        when the app loads, listen to the DB (firestore)
        and fetch new todos as they get added/removed
     */
    // hook that runs on app startup
    useEffect(() => {
        // run this on app start
        db.collection('todos').orderBy('timestamp', "desc").onSnapshot(snapshot => {
            console.log('db todos: ', snapshot.docs.map(doc => doc.data()));
            setTodos(snapshot.docs.map(doc => doc.data()));
            console.log('our todos: ', todos);
        })
    }, []);

    const addTodo = (event) =>{
        // this fires when we click the button
        // console.log('addTodo: YOU CLICKED THE BUTTON :)');
        // event.preventDefault(); // stop the page from refreshing
        // add it to the db where collection = todos and append taskName: input
        db.collection('todos').add({
            taskName: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        //setTodos([...todos, input]); // a spread - spread the stuff in the array, and append
        setInput(''); // clear the input
    }

  return (
    <div className="App">
      <h1>hi good day</h1>

        <form action="">
            <FormControl>
                <InputLabel>Write a To-Do</InputLabel>
                <Input
                    value={input}
                    onChange={event => setInput(event.target.value)}
                />
            </FormControl>

            <Button
                variant={"contained"}
                color={"primary"}
                type={"submit"}
                onClick={addTodo}
                disabled={!input} // disable btn if text field is empty
            >
                Add To-Do
            </Button>
        </form>

        <ul>
            {todos.map(todo => (
                <TodoList
                    taskName={todo.taskName}
                    taskCreatedDate={todo.timestamp}
                />
            ))}
        </ul>

    </div>
  );
}

export default App;
