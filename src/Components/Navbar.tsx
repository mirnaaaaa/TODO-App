import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
import { auth, db } from "../firebaseConfig";
import { IdContext, User, UserContextType } from "../IdContext";

interface ThemeType {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}

export default function Navbar({ theme, setTheme }: ThemeType) {
  const { userId, setUserId, user,setUser } = useContext(IdContext) as UserContextType;
  let navigate = useNavigate();

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      navigate("/Login");
    });
    setUserId(null);
    setUser(undefined)
  };

  return (
    <div className="navbar">
      <div className="space">
        <div>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
        <div>
          {userId &&
            <div className="name-logout">
            <h1 className="userName">{user?.map((x: User) => x.name)}</h1>
              <h1 className="logout" onClick={handleLogout}>
                Logout
              </h1>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
