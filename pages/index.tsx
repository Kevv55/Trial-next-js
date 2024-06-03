import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
    console.log("To-dos", todos);
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  console.log("Trial");

  client.models.Todo.observeQuery().subscribe({
    next: (data) => console.log([...data.items]),
  });

  return (
    <main>
      <div>
        <h1>Notes</h1>
        <button onClick={createTodo}>New</button>
        {/* <ul>
          {todos.map((todo) => (
            <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
              {todo.content}
            </li>
          ))}
        </ul> */}
        <div>
          {todos.map((todo) => (
            <Note content={todo.content} />
          ))}
        </div>
      </div>
    </main>
  );
}

export function Note({ content }: any) {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
}
