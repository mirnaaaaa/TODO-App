import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

type ChildrenType = {
  children: React.ReactNode;
};

export type User = {
  name: string| number;
  uid: string| number;
}

export type UserContextType = {
  userId: string | number | null;
  setUserId: React.Dispatch<React.SetStateAction<string | number | null>>;
  user:  User[] | undefined;
  setUser: React.Dispatch<React.SetStateAction<User[] | undefined>>;
};

export const IdContext = createContext<UserContextType | null>(null);

export const IdContextProvider = ({ children }: ChildrenType) => {
  const [userId, setUserId] = useState<any>();
  const [ user, setUser] = useState<User[]>()

  useEffect(() => {
    const Auth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user?.uid);
      } else {
        setUserId(null);
      }
    });
    return () => {
      Auth();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      getDoc(doc(db, "users", userId)).then((snap) => {
        let array: any = []
        array.push(snap.data());
        setUser(array)
      });
    }
  }, [userId, user]);

  const value = {
    userId,
    setUserId,
    setUser,
    user
  };

  return <IdContext.Provider value={value}>{children}</IdContext.Provider>;
};
