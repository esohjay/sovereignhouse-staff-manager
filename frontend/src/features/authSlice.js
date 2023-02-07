import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    const token = await auth.currentUser.getIdToken({ forceRefresh: true });
    //post new user record to db
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
      info,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

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
    const token = await auth.currentUser.getIdToken({ forceRefresh: true });
    //verify user and get record from db
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
      info,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  }
);
//Logout
export const logOut = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

//get user id token
export const getUserIdToken = createAsyncThunk(
  "auth/getUserIdToken",
  async () => {
    const token = auth.currentUser.getIdToken({ forceRefresh: true });
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
  userForm: null,
  status: "idle",
  user: null,
  currentUser: null,
  token: null,
  userDb: null,
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
    //register to db
    builder.addCase(registerUserToDb.fulfilled, (state, action) => {
      state.token = action.payload;
      state.status = "success";
    });
    builder.addCase(registerUserToDb.rejected, (state, action) => {
      state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(registerUserToDb.pending, (state, action) => {
      state.status = "pending";
    });
    //logout
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.currentUser = action.payload;
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
export const { getUserFormData, setCurrentUser } = authSlice.actions;

export const selectUserForm = (state) => state.auth.userForm;
export const selectUser = (state) => state.auth.user;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
