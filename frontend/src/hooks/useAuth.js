import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { auth } from "../config/firebase";
import {
  setCurrentUser,
  selectCurrentUser,
  getUserIdToken,
  selectToken,
  setAdminStatus,
  selectAdminStatus,
} from "../features/authSlice";

function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const newToken = useSelector(selectToken);

  const admin = useSelector(selectAdminStatus);
  setInterval(console.log("jjj"), 2000);
  auth.currentUser
    ?.getIdTokenResult()
    .then((token) => {
      if (!!token.claims.admin) {
        dispatch(setAdminStatus());
      }
      const tokenExpired = new Date() < token.expirationTime;
      if (tokenExpired) {
        dispatch(getUserIdToken());
        Cookies.set("token", `Bearer ${newToken}`, { expires: 1 });
      } else {
        console.log("not expired");
      }
    })
    .catch((error) => {
      console.log(error);
    });

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
  return { user, isAdmin: admin };
}

export default useAuth;
