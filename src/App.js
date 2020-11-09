import './App.css';
import React, {useEffect, useState} from "react";
import { Button } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TodoList from "./TodoList/TodoList";
import db from "./firebase";
import firebase from "firebase";
import Login from "./Login/Login";
import { GoogleLogout } from 'react-google-login';

function App() {
    // states -> update live on the page
    const [
        todos, // state variable
        setTodos // state variable setter
    ] = useState([]); // start as an empty array
    const [completedTodos, setCompletedTodos] = useState([]);
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
    useEffect(() => {
        // run this on app start
        db.collection('todos').orderBy('completedDate', "desc").onSnapshot(snapshot => {
            // console.log('db todos: ', snapshot.docs.map(doc => doc.data()));
            setCompletedTodos(
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
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userId: user.googleId
        });
        //setTodos([...todos, input]); // a spread - spread the stuff in the array, and append
        setInput(''); // clear the input
    }

    const [user, setUser] = useState([]);
    const getUser = ((childData) => {
        setUser(childData);
        // console.log(user, user.length, user.email);
    });

    function logError() {
        // console.log('logout error');
        return 'logout error';
    }

    function logout() {
        // console.log('logged out :)');
        // console.log(user);
        setUser([]);
        return 'logged out :)';
    }

    function canPrintCurrentTaskList(todo, googleId) {
        // to do = to do.data, googleId = user.googleId
        if(googleId !== todo.userId){
            return false;
        } return !todo.completedDate;
    }

    function canPrintCompletedTaskList(todo, googleId) {
        // to do = to do.data, googleId = user.googleId
        if(googleId !== todo.userId){
            return false;
        } return todo.completedDate;
    }

    return (
    <div className="app">
        {user.googleId > 0 ? (
            // if logged in, render app
            <>
            <GoogleLogout
                clientId="235258480463-7emltov5gfotr9iiouka5d0bfshuu450.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
                onFailure={logError}
            />
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
                                canPrintCurrentTaskList(todo.data, user.googleId) &&
                                <TodoList
                                    key={todo.id}
                                    id={todo.id}
                                    taskName={todo.data.taskName}
                                    taskCreatedDate={todo.data.timestamp}
                                    userId={user.googleId}
                                />
                            ))}
                        </ul>
                    </div>
                    <hr/>
                    <div className="tasks__card">
                        <h2>Completed</h2>
                        <hr/>
                        <ul>
                            {completedTodos.map(todo => (
                                canPrintCompletedTaskList(todo.data, user.googleId) &&
                                <TodoList
                                    key={todo.id}
                                    id={todo.id}
                                    taskName={todo.data.taskName}
                                    taskCreatedDate={todo.data.timestamp}
                                    taskCompletedDate={todo.data.completedDate}
                                    userId={user.googleId}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        ) : (
            <Login parentCallBack={getUser}/>
        )}
        {/*<p>ooo monsta: {user.email}</p>*/}

    </div>
  );
}

export default App;
