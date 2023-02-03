import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  isDropdownOpen: false,
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
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, toggleDropdown } = appSlice.actions;

export const selectSidebarState = (state) => state.app.isSidebarOpen;
export const selectDropdownState = (state) => state.app.isDropdownOpen;

export default appSlice.reducer;
