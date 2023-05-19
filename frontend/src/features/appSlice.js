import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  isDropdownOpen: false,
  isNotificationOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleDropdown: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    toggleNotification: (state) => {
      state.isNotificationOpen = !state.isNotificationOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, toggleDropdown, toggleNotification } =
  appSlice.actions;

export const selectSidebarState = (state) => state.app.isSidebarOpen;
export const selectDropdownState = (state) => state.app.isDropdownOpen;
export const selectNotificationState = (state) => state.app.isNotificationOpen;

export default appSlice.reducer;
