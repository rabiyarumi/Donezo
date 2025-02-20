/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.init";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //logOut
  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  //-------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log("from authProvider", currentUser);

      if (currentUser?.email) {
        setUser(currentUser);
        console.log(currentUser);
        // save user info in db
        await axios.post(
          `${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,
          {
            name: currentUser?.displayName,
            image: currentUser?.photoURL,
            email: currentUser?.email,
          }
        );
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,

    userLogout,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
