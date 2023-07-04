import React, { useState } from "react";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const [dataSignUp, setDataSignUp] = useState({
    Name: "",
    Email: "",
    Password: ""
  });

  let navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = { [e.target.name]: e.target.value };
    setDataSignUp({ ...dataSignUp, ...input });
  };

  const handleSubmit = () => {
    createUserWithEmailAndPassword(
      auth,
      dataSignUp.Email,
      dataSignUp.Password
    ).then((res) => {
      // const user= res.user
      setDoc(doc(db, "users", res.user.uid), {
        displayName: dataSignUp.Name,
        uid: res.user.uid
      }).then(() => {
        setDataSignUp({
          Name: "",
          Email: "",
          Password: ""
        });
        const user = res.user;
        updateProfile(user, {
          displayName: dataSignUp.Name
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
        <div className="name">
          <input
            className="fullName"
            type="text"
            placeholder="FullName"
            onChange={handleInput}
            name="Name"
            value={dataSignUp.Name}
          />
        </div>
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
          Sign Up
        </button>
      </div>
      <h1 className="register">
        Already have an account..{" "}
        <Link className="link" to="/Login">
          LOGIN
        </Link>{" "}
      </h1>
    </div>
  );
}
