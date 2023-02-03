import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ icon, path, text }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "bg-lightGreen text-mainColor  font-medium border-l-4  border-l-mainColor rounded-lg block"
          : "bg-transparent text-stone-800 block font-medium hover:text-mainColor hover:bg-white"
      }
    >
      <div className="flex p-2 gap-x-3 items-center  rounded-lg group">
        <button className="text-xl group-hover:font-bold ">{icon}</button>

        <p className="capitalize group-hover:font-bold">{text}</p>
      </div>
    </NavLink>
  );
}

export default NavItem;
