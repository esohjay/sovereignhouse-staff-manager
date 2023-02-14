import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { auth } from "../config/firebase";
import { setCurrentUser, selectCurrentUser } from "../features/authSlice";

function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      dispatch(setCurrentUser(currentUser?.toJSON()));
      if (currentUser === null) {
        Cookies.remove("token");
      } else {
        const token = await currentUser.getIdToken(true);
        Cookies.set("token", `Bearer ${token}`, { expires: 1 });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return { user };
}

export default useAuth;
