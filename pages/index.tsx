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

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>My todos</h1>
      <p>Trial...</p>
      {/* <button onClick={createTodo}>+ new</button> */}
      <div className="note">
        <form onSubmit={createTodo} style={{ display: "contents" }}>
          <input
            placeholder="Type in..."
            value={t}
            onChange={(e) => setT(e.target.value)}
            className="form"
          ></input>
          <button type="submit">New</button>
        </form>
      </div>

      <div className="grid">
        {todos.map((todo) => (
          <div className="note" key={todo.id}>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
            <p>{todo.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
