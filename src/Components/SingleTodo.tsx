import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebaseConfig";
import { IdContext, UserContextType } from "../IdContext";
import { Tasks } from "../TodoType";
import { CiEdit } from "react-icons/ci";
import { FiX, FiCheckCircle } from "react-icons/fi";

interface TaskType {
  task: Tasks;
}

export const SingleTodo = ({ task }: TaskType) => {
  const { userId } = useContext(IdContext) as UserContextType;
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState(task.text);

  const handleCompleted = (id: Tasks) => {
    const toUpdate = doc(db, `tasks/${userId}/task/${id.id}`);
    updateDoc(toUpdate, {
      Completed: !id.Completed
    }).catch((err) => console.log(err));
  };

  const update = (id: string | number) => {
    if (!edit) {
      setEdit(true);
    }
  };

  const updated = (id: string | number) => {
    const edited = doc(db, `tasks/${userId}/task/${id}`);
    updateDoc(edited, {
      text: editTodo
    });
    setEditTodo("");
    setEdit(false);
  };

  const handleDelete = async (id: string | number) => {
    const toDelete = doc(db, `tasks/${userId}/task/${id}`);
    await deleteDoc(toDelete);
  };

  return (
    <div className="singleTodo" key={task.id}>
      {edit ? (
        <div className="handle-update">
      <div className="input-dev">
      <input
                className="INPUT"
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
          </div> 
          <div className="move">
          <button className="UPDATE" onClick={() => updated(task.id)}>UPDATE</button>
          </div>
          </div>
  ) : (
        <div className="divTodo">
          <div className="text">
            <h1
              className={task.Completed === true ? "taskCompleted" : "taskText"}
            >
              {task.text}
            </h1>
          </div>
          <div className="options">
            <FiCheckCircle
              onClick={() => handleCompleted(task)}
              className={task.Completed === true ? "completed" : "complete"}
            />
            {task.Completed === false && (
              <CiEdit onClick={() => update(task.id)} className="edit" />
            )}
            <FiX onClick={() => handleDelete(task.id)} className="delete" />
          </div>
        </div>
      )}
    </div>
  );
};
