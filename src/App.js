import './App.css';
import React, {useState} from "react";

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
            <input value={input} onChange={event => setInput(event.target.value)} />
            <button type={"submit"} onClick={addTodo}>add to do</button>
        </form>

        <ul>
            {todos.map(todo => (
                <li>{todo}</li>
            ))}
        </ul>

    </div>
  );
}

export default App;
