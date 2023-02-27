import React, { useEffect } from "react";
import Cookies from "js-cookie";

import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";

function LeaveContainer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAdmin = Cookies.get("isAdmin")
    ? JSON.parse(Cookies.get("isAdmin"))
    : null;
  return (
    <section className="p-8">
      <section className=" ">
        {!isAdmin && (
          <div className="grid grid-cols-2 gap-3 mb-7 font-medium  w-fit">
            <NavLink
              to={`/vms/${id}/leave`}
              className={({ isActive }) =>
                isActive
                  ? "inline-block px-5 py-2 text-white text-center rounded-md shadow-md bg-mainColor capitalize hover:bg-lightGreen hover:text-mainColor"
                  : "inline-block px-5 py-2 text-mainColor text-center rounded-md shadow-md bg-white capitalize hover:bg-lightGreen"
              }
            >
              leave requests
            </NavLink>
            <NavLink
              to={`/vms/${id}/leave/request`}
              className={({ isActive }) =>
                isActive
                  ? "inline-block px-5 py-2 text-white bg-mainColor text-center rounded-md shadow-md capitalize hover:bg-lightGreen hover:text-mainColor"
                  : "inline-block px-5 py-2 text-mainColor bg-white text-center rounded-md shadow-md capitalize hover:bg-lightGreen"
              }
            >
              request leave
            </NavLink>
          </div>
        )}

        <article className="bg-white shadow-md rounded-md ">
          <Outlet />
        </article>
      </section>
    </section>
  );
}

export default LeaveContainer;
