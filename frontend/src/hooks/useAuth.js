import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../config/firebase";
import { setCurrentUser, selectCurrentUser } from "../features/authSlice";

function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setCurrentUser(currentUser?.toJSON()));
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return { user };
}

export default useAuth;
