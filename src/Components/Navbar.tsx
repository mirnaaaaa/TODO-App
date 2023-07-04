import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
import { auth } from "../firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { addUser, Logout } from "../features/Users";
interface ThemeType {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}

export default function Navbar({ theme, setTheme }: ThemeType) {
  let navigate = useNavigate();
  const Name = useSelector((state: any) => state.users.value.displayName);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
console.log(Name)
  useEffect(() => {
    const Auth = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            id: user.uid,
            displayName: user.displayName
          })
        );
      } else {
        dispatch(Logout());
      }
    });
    return () => {
      Auth();
    };
  }, [dispatch, Name]);

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      navigate("/Login");
    });
  };

  return (
    <div className="navbar">
      <div className="space">
        <div>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
        <div>
          {!Name ? (
            <div className="sign-login">
              <Link className="link" to="/SignUp">
                <h1 className="logout">SignUp</h1>
              </Link>
              <Link className="link" to="/Login">
                <h1 className="logout">Login</h1>
              </Link>
            </div>
          ) : (
            <div className="name-logout">
              <h1 className="userName">{Name}</h1>
              <h1 className="logout" onClick={handleLogout}>
                Logout
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
