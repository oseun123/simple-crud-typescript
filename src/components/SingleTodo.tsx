import React, { useEffect, useState, useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "./model";

interface SingleTodoProps {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<SingleTodoProps> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on the input field when edit mode is activated
  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTodo.trim()) {
      // Check if the edited todo is not empty
      setTodos(
        todos.map((t) => (t.id === todo.id ? { ...t, todo: editTodo } : t))
      );
      setEdit(false);
    }
  };

  const handleDelete = () => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const handleDone = () => {
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...t, isDone: !t.isDone } : t))
    );
  };

  return (
    <form onSubmit={handleEdit} className="todos__single">
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
          ref={inputRef}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(true);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={handleDelete}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={handleDone}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
