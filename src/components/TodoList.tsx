import React from "react";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
function TodoList({ todos, setTodos }: TodoListProps) {
  return (
    <div className="todos">
      {todos.map((todo: Todo) => (
        <SingleTodo
          todo={todo}
          key={todo.id}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
}

export default TodoList;
