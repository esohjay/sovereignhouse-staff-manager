import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";

function Hrm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {} = useAuth();
  return (
    <section className="p-8">
      <section className=" ">
        <div className="grid grid-cols-2 gap-3 mb-7 font-medium  w-fit">
          <NavLink
            to={`/vms/${id}/admin/staff`}
            className={({ isActive }) =>
              isActive
                ? "inline-block px-5 py-2 text-white text-center rounded-md shadow-md bg-mainColor capitalize hover:bg-lightGreen hover:text-mainColor"
                : "inline-block px-5 py-2 text-mainColor text-center rounded-md shadow-md bg-white capitalize hover:bg-lightGreen"
            }
          >
            staff record
          </NavLink>
          <NavLink
            to={`/vms/${id}/admin/staff/add`}
            className={({ isActive }) =>
              isActive
                ? "inline-block px-5 py-2 text-white bg-mainColor text-center rounded-md shadow-md capitalize hover:bg-lightGreen hover:text-mainColor"
                : "inline-block px-5 py-2 text-mainColor bg-white text-center rounded-md shadow-md capitalize hover:bg-lightGreen"
            }
          >
            add staff
          </NavLink>
        </div>
        <article className="bg-white shadow-md rounded-md ">
          <Outlet />
        </article>
      </section>
    </section>
  );
}

export default Hrm;
