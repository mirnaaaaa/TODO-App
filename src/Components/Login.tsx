import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [dataSignUp, setDataSignUp] = useState({
    Password: "",
    Email: ""
    });

  const database = collection(db, "users");

  let navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = { [e.target.name]: e.target.value };
    setDataSignUp({ ...dataSignUp, ...input });
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(
      auth,
      dataSignUp.Email,
      dataSignUp.Password
    ).then((res) => {
      // const user= res.user
      addDoc(database, dataSignUp).then(() => {
        setDataSignUp({
          Email: "",
          Password: ""
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });
    });
  };

  return (
    <div className="padding">
      <div className="signUpContainer">
        <div className="emailHandle">
          <input
            className="fullName"
            type="text"
            placeholder="Email"
            name="Email"
            onChange={(e) => handleInput(e)}
            value={dataSignUp.Email}
          />
        </div>
        <input
          className="fullName"
          type="password"
          placeholder="Password"
          onChange={(e) => handleInput(e)}
          value={dataSignUp.Password}
          name="Password"
        />
              </div>
        <div className="moveSignUp">
          <button className="SIGNUP" onClick={handleSubmit}>
            Login
          </button>
        </div>
      <h1 className="register">Don't have an account.. <Link className="link" to="/SignUp">SignUp</Link> </h1>
    </div>
  );
}
