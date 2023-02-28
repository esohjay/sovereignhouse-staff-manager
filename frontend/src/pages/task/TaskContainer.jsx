import React from "react";

import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";

function Task() {
  const { id } = useParams();
  return (
    <section className="p-8">
      <section className=" ">
        <div className="grid grid-cols-3 gap-3 mb-7 font-medium  w-fit">
          <NavLink
            to={`/vms/${id}/admin/task`}
            className={({ isActive }) =>
              isActive
                ? "inline-block px-5 py-2 text-white text-center rounded-md shadow-md bg-mainColor capitalize hover:bg-lightGreen hover:text-mainColor"
                : "inline-block px-5 py-2 text-mainColor text-center rounded-md shadow-md bg-white capitalize hover:bg-lightGreen"
            }
          >
            tasks
          </NavLink>
          <NavLink
            to={`/vms/${id}/admin/task/add`}
            className={({ isActive }) =>
              isActive
                ? "inline-block px-5 py-2 text-white bg-mainColor text-center rounded-md shadow-md capitalize hover:bg-lightGreen hover:text-mainColor"
                : "inline-block px-5 py-2 text-mainColor bg-white text-center rounded-md shadow-md capitalize hover:bg-lightGreen"
            }
          >
            add task
          </NavLink>
        </div>
        <article className="bg-white shadow-md rounded-md min-h-[50vh] ">
          <Outlet />
        </article>
      </section>
    </section>
  );
}

export default Task;
