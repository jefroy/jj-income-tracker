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
            // console.log('db todos: ', snapshot.docs.map(doc => doc.data()));
            setTodos(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            );
            // console.log('our todos: ', todos);
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
    <div className="app">
        <h1>😊 Task Manager 😊</h1>
        <form className={"app__form"}>
            <div className={"app__form__FormControl"}>
                <FormControl>
                    <InputLabel>Write a To-Do</InputLabel>
                    <Input
                        value={input}
                        onChange={event => setInput(event.target.value)}
                    />
                </FormControl>
            </div>
            <div className="app__form__Button">
                <Button
                    variant={"contained"}
                    color={"primary"}
                    type={"submit"}
                    onClick={addTodo}
                    disabled={!input} // disable btn if text field is empty
                >
                    Add To-Do
                </Button>
            </div>
        </form>

        <div className={"app__todoList"}>
            <div className="tasks__card">
                <h2>Current</h2>
                <hr/>
                <ul>
                    {todos.map(todo => (
                        <TodoList
                            key={todo.id}
                            id={todo.id}
                            taskName={todo.data.taskName}
                            taskCreatedDate={todo.data.timestamp}
                        />
                    ))}
                </ul>
            </div>
            <hr/>
            <div className="tasks__card">
                <h2>Completed</h2>
                <hr/>
                <ul>
                    {todos.map(todo => (
                        <TodoList
                            key={todo.id}
                            id={todo.id}
                            taskName={todo.data.taskName}
                            taskCreatedDate={todo.data.timestamp}
                        />
                    ))}
                </ul>
            </div>

        </div>

    </div>
  );
}

export default App;
