import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import { Tasks } from "./../TodoType";
import { SingleTodo } from "./SingleTodo";
import { AiFillPlusSquare } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Todo() {
  const [todo, setTodo] = useState<string | number>();
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const id = useSelector((state: any) => state.users.value.id);

  useEffect(() => {
    if (id) {
      const q = query(collection(db, `tasks/${id}/task`));
      const read = onSnapshot(q, (snap) => {
        let array: any = [];
        snap.forEach((doc) => {
          array.push({ ...doc.data(), id: doc.id });
        });
        setTasks(array);
      });
      return () => read();
    }
  }, [id]);

  const addTask = async () => {
    if (id) {
      if (todo === "") {
        alert("Enter your task");
      } else if (!id) {
        alert("Please login first");
      } else {
        const data = collection(db, `tasks/${id}/task`);
        await addDoc(data, {
          text: todo,
          Completed: false
        });
      }
    }
    setTodo("");
  };

  return (
    <div className="todoList">
      <h1 className="appName">TODO APP</h1>
      <hr className="hr"></hr>
      <div className="input-dev">
        <input
          className="Input"
          type="text"
          placeholder="Add Task"
          onChange={(e) => setTodo(e.target.value)}
          name="todo"
          value={todo}
        />
        <div className="add-dev">
          <AiFillPlusSquare className="Add" onClick={addTask} />
        </div>
      </div>
      {tasks?.map((task: Tasks) => (
        <div className="tasks" key={task.id}>
          <SingleTodo task={task} />
        </div>
      ))}
    </div>
  );
}
