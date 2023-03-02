import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Todo from "./Components/Todo";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import { useState, createContext } from "react";
import ReactSwitch from "react-switch";
import { IdContext, IdContextProvider, UserContextType } from "./IdContext";

export const ThemeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState<string>("light");

  return (
    <div className="App" id={theme}>
      <Router>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/" element={<Todo />} />
        </Routes>
      </Router>
    </div>
  );
}
