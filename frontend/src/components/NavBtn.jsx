import React from "react";
import { NavLink } from "react-router-dom";

function NavBtn({ icon, path, text, action }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "text-mainColor bg-lightGreen block w-28 h-28 rounded-lg shadow-md"
          : "w-28 h-28 bg-white rounded-lg shadow-md text-stone-800 block"
      }
    >
      <div
        onClick={action}
        className="h-full flex flex-col  justify-center items-center space-y-2"
      >
        <button className="text-3xl">{icon}</button>

        <p className="text-mainColor capitalize text-sm">{text}</p>
      </div>
    </NavLink>
  );
}

export default NavBtn;
