import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { auth } from "../../config/firebase";
import { getUserIdToken } from "../../features/authSlice";

const customFetchBaseQuery = (baseUrl, { dispatch, getState }) => {
  dispatch(getUserIdToken());
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, { getState }) => {
      //   await dispatchThunk(getUserIdToken());
      const tokens = await auth?.currentUser?.getIdToken(token);
      const state = getState();
      const { token } = state.auth; // Assuming you have stored the current user in the redux store
      console.log(auth, tokens, "kskks");
      if (token) {
        return {
          ...headers,
          Authorization: `Bearer ${token}`,
        };
      }

      return headers;
    },
  });
};

// Initialize Firebase app
// const firebaseConfig = { /* Your firebase config */ };
// firebase.initializeApp(firebaseConfig);

// Define the baseQuery with firebase auth token middleware
const baseQuery = customFetchBaseQuery(import.meta.env.VITE_BACKEND_URL);

// Export the baseQuery to use with createApi
export default baseQuery;
