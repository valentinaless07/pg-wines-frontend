import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  // updateProfile,
  // getAuth,
  signInWithPopup,
} from "firebase/auth";

import { googleAuthProvider } from "../../firebase/firebaseConfig";
import { saveStorage } from "../../helpers/helpers";
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR } from '../actions/authActions';

export default function useUser() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { replace } = useHistory();

  const startGoogleLogin = useCallback(() => {
    dispatch({
      type: AUTH_LOGIN,
    });
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
          },
        });
        saveStorage({
          loggedIn: false,
          fetching: false,
          error: null,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        });
        replace("/");
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: AUTH_LOGIN_ERROR,
          payload: err.message,
        });
      });
  });

  return {
    startGoogleLogin,
  };
}
