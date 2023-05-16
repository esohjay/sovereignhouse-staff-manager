import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

//fireabse
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (info) => {
    //create user
    const user = await sendPasswordResetEmail(auth, info.email);
    return true;
  }
);

//Email and password sign in
export const logInWithEmailAndPassword = createAsyncThunk(
  "auth/logInWithEmailAndPassword",
  async (info, { dispatch }) => {
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

    Cookies.set("token", `Bearer ${token}`, { expires: 1 });

    if (data) {
      Cookies.set(
        "user",
        JSON.stringify({ user: data.fullName, userId: data.id }),
        {
          expires: 1,
        }
      );

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
      dispatch(setAuthStatus(false));
    }
    return data;
  }
);

//change email
export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      //firebase update
      await updateEmail(auth.currentUser, info.email);
      //get user token
      const token = await auth?.currentUser?.getIdToken(true);
      //update db record
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/${info.id}`,
        info,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(setStatusMsg(message));
      return rejectWithValue();
    }
  }
);

//change password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      //firebase update oassword
      await updatePassword(auth.currentUser, info.password);
      return true;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(setStatusMsg(message));
      return rejectWithValue();
    }
  }
);

//Logout
export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await signOut(auth);
    Cookies.remove("user");
    Cookies.remove("isAdmin");
    dispatch(setAuthStatus(true));
    dispatch(setUser(null));
    return null;
  }
);

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
  registeredUser: null,
  currentUser: null,
  token: null,
  isAdmin: false,
  changedPassword: false,
  statusMsg: null,
  signedOut: false,
  error: null,
  passwordReset: false,
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
    setStatusMsg: (state, action) => {
      state.statusMsg = action.payload;
    },
    resetRegistedUser: (state) => {
      state.registeredUser = null;
    },
    setAuthStatus: (state, action) => {
      state.signedOut = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    //sign up
    builder.addCase(signUpWithEmailAndPassword.fulfilled, (state, action) => {
      state.registeredUser = action.payload;
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
    //reset password
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.changedPassword = action.payload;
      state.status = "success";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(changePassword.pending, (state, action) => {
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
    builder.addCase(changeEmail.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(changeEmail.rejected, (state, action) => {
      // state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(changeEmail.pending, (state, action) => {
      state.status = "pending";
    });
    //reset password
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.passwordReset = action.payload;
      state.status = "success";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.error = action.error;
      state.status = "failed";
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.status = "pending";
    });
    //logout
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.user = null;
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
export const {
  getUserFormData,
  setCurrentUser,
  setAdminStatus,
  setStatusMsg,
  resetRegistedUser,
  setAuthStatus,
  setUser,
} = authSlice.actions;

export const selectUserForm = (state) => state.auth.userForm;
export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;
export const selectRegisteredUser = (state) => state.auth.registeredUser;
export const selectStatusMsg = (state) => state.auth.statusMsg;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.signedOut;
export const selectAdminStatus = (state) => state.auth.isAdmin;
export const selectResetPassword = (state) => state.auth.passwordReset;
export const selectStatus = (state) => state.auth.status;

export default authSlice.reducer;
