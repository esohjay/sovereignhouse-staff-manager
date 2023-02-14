import React from "react";
import { NavLink } from "react-router-dom";
import { logOut } from "../features/authSlice";
import { useDispatch } from "react-redux";

function DesktopTopNavItem({ icon, path, text, isLogout }) {
  const dispatch = useDispatch();
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "block font-medium border-b-2 border-lightGreen rounded-m text-white hover:border-green-400"
          : "text-white block font-medium hover:text-mainColor rounded-md hover:bg-lightGreen"
      }
    >
      <div
        className="flex p-2 items-center  flex-col justify-center 
      gap-y-1"
      >
        <button className="text-xl">{icon} </button>

        <p className="capitalize text-xs">{text}</p>
      </div>
    </NavLink>
  );
}

export default DesktopTopNavItem;
