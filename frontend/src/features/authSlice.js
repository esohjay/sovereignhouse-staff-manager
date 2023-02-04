import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    const user = await createUserWithEmailAndPassword(
      auth,
      info.email,
      info.password
    );
    return user.user.toJSON();
  }
);

//Email and password sign in
export const logInWithEmailAndPassword = createAsyncThunk(
  "auth/logInWithEmailAndPassword",
  async (info) => {
    const user = await signInWithEmailAndPassword(
      auth,
      info.email,
      info.password
    );
    return user.user.toJSON();
  }
);

const initialState = {
  userForm: null,
  status: "idle",
  user: null,
  currentUser: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { getUserFormData, setCurrentUser } = authSlice.actions;

export const selectUserForm = (state) => state.auth.userForm;
export const selectUser = (state) => state.auth.user;
export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
