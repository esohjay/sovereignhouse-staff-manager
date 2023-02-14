import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  isDropdownOpen: false,
};

export const staffSlice = createSlice({
  name: "staff",
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
export const { toggleSidebar, toggleDropdown } = staffSlice.actions;

export const selectSidebarState = (state) => state.staff.isSidebarOpen;
export const selectDropdownState = (state) => state.staff.isDropdownOpen;

export default staffSlice.reducer;
