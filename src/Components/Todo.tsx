import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import React, { useState, useEffect, useContext } from "react";
import { Tasks } from "./../TodoType";
import { SingleTodo } from "./SingleTodo";
import { IdContext, UserContextType } from "../IdContext";
import { AiFillPlusSquare } from "react-icons/ai";

export default function Todo() {
  const { userId } = useContext(IdContext) as UserContextType;
  const [todo, setTodo] = useState<string | number>();
  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    const q = query(collection(db, `tasks/${userId}/task`));
    const read = onSnapshot(q, (snap) => {
      let array: any = [];
      snap.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      setTasks(array);
    });
    return () => read();
  }, [userId]);

  const addTask = async () => {
    if (todo === "") {
      alert("Enter your task");
    } else {
      const data = collection(db, `tasks/${userId}/task`);
      await addDoc(data, {
        text: todo,
        Completed: false
      });
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
