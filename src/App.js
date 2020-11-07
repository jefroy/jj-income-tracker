import './App.css';
import React, {useState} from "react";
import { Button } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TodoList from "./TodoList/TodoList";

function App() {
    // states -> update live on the page
    const [
        todos, // state variable
        setTodos // state variable setter
    ] = useState(['walk dog', 'eat lunch', 'procure goods']); // start as an empty array
    const [input, setInput] = useState('');
    console.log(input);

    const addTodo = (event) =>{
        // this fires when we click the button
        // console.log('addTodo: YOU CLICKED THE BUTTON :)');
        event.preventDefault(); // stop the page from refreshing
        setTodos([...todos, input]); // a spread - spread the stuff in the array, and append
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
                <TodoList taskName={todo}/>
            ))}
        </ul>

    </div>
  );
}

export default App;
