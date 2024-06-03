import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [t, setT] = useState("");

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: t,
    });
  }

  return (
    <main>
      <h1>My todos</h1>
      <p>Trial...</p>
      {/* <button onClick={createTodo}>+ new</button> */}
      <form onSubmit={createTodo}>
        <input
          placeholder="Type in..."
          value={t}
          onChange={(e) => setT(e.target.value)}
        ></input>
        <button type="submit">New</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </main>
  );
}
