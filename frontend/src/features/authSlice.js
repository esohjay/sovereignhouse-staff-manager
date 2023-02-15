import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

//fireabse
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

//email and password sign up
export const signUpWithEmailAndPassword = createAsyncThunk(
  "auth/signUpWithEmailAndPassword",
  async (info) => {
    //create user
    const user = await createUserWithEmailAndPassword(
      auth,
      info.email,
      info.password
    );
    //get user token
    const token = await auth.currentUser.getIdToken(true);
    //post new user record to db
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user`,
      info,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data) {
      Cookies.set("user", JSON.stringify({ user: data.fullName }), {
        expires: 1,
      });
    }
    // return user.user.toJSON();
    return data;
  }
);

//Email and password sign in
export const logInWithEmailAndPassword = createAsyncThunk(
  "auth/logInWithEmailAndPassword",
  async (info) => {
    //login
    const user = await signInWithEmailAndPassword(
      auth,
      info.email,
      info.password
    );
    //get user token
    const token = await auth.currentUser.getIdToken(true);
    //verify user and get record from db
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/login`,
      info,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data) {
      Cookies.set("user", JSON.stringify({ user: data.fullName }), {
        expires: 1,
      });
      auth.currentUser.getIdTokenResult().then((token) => {
        if (!!token.claims.admin) {
          Cookies.set("isAdmin", JSON.stringify(true), {
            expires: 1,
          });
        } else {
          Cookies.set("isAdmin", JSON.stringify(false), {
            expires: 1,
          });
        }
      });
    }
    return data;
  }
);
//Logout
export const logOut = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  Cookies.remove("user");
  Cookies.remove("isAdmin");

  return null;
});

//get user id token
export const getUserIdToken = createAsyncThunk(
  "auth/getUserIdToken",
  async () => {
    const token = await auth.currentUser?.getIdToken(true);
    return token;
  }
);
//reg user to db
export const registerUserToDb = createAsyncThunk(
  "auth/registerUserToDb",
  async (info) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
      info,
      {
        headers: {
          Authorization: `Bearer ${info.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }
);

const initialState = {
  status: "idle",
  user: null,
  currentUser: null,
  token: null,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserFormData: (state, action) => {
      state.userForm = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setAdminStatus: (state) => {
      state.isAdmin = true;
    },
  },
  extraReducers: (builder) => {
    //sign up
    builder.addCase(signUpWithEmailAndPassword.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(signUpWithEmailAndPassword.rejected, (state, action) => {
      state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(signUpWithEmailAndPassword.pending, (state, action) => {
      state.status = "pending";
    });
    //login
    builder.addCase(logInWithEmailAndPassword.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(logInWithEmailAndPassword.rejected, (state, action) => {
      state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(logInWithEmailAndPassword.pending, (state, action) => {
      state.status = "pending";
    });
    //token
    builder.addCase(getUserIdToken.fulfilled, (state, action) => {
      state.token = action.payload;
      state.status = "success";
    });
    builder.addCase(getUserIdToken.rejected, (state, action) => {
      state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(getUserIdToken.pending, (state, action) => {
      state.status = "pending";
    });
    // //register to db
    // builder.addCase(registerUserToDb.fulfilled, (state, action) => {
    //   state.token = action.payload;
    //   state.status = "success";
    // });
    // builder.addCase(registerUserToDb.rejected, (state, action) => {
    //   state.error = action.error;
    //   state.status = "failed";
    // });
    // builder.addCase(registerUserToDb.pending, (state, action) => {
    //   state.status = "pending";
    // });
    //logout
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(logOut.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

// Action creators are generated for each case reducer function
export const { getUserFormData, setCurrentUser, setAdminStatus } =
  authSlice.actions;

export const selectUserForm = (state) => state.auth.userForm;
export const selectUser = (state) => state.auth.user;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectToken = (state) => state.auth.token;
export const selectAdminStatus = (state) => state.auth.isAdmin;

export default authSlice.reducer;
