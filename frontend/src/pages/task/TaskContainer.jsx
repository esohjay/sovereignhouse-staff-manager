import React from "react";

import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";
import Btn from "../../components/Btn";

function Task() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <section className="p-8">
      <section className=" ">
        <div className="grid grid-cols-3 gap-3 mb-7 font-medium  w-fit">
          {/* <NavLink
            to={`/vms/${id}/task`}
            className={({ isActive }) =>
              isActive
                ? "inline-block px-5 py-2 text-white text-center rounded-md shadow-md bg-mainColor capitalize hover:bg-lightGreen hover:text-mainColor"
                : "inline-block px-5 py-2 text-mainColor text-center rounded-md shadow-md bg-white capitalize hover:bg-lightGreen"
            }
          >
            tasks
          </NavLink> */}
          <Btn text={"tasks"} onClick={() => navigate(`/vms/${id}/task`)} />
          <Btn
            text={"add task"}
            color={2}
            onClick={() => navigate(`/vms/${id}/task/add`)}
          />
        </div>
        <article className="bg-white shadow-md rounded-md min-h-[50vh] ">
          <Outlet />
        </article>
      </section>
    </section>
  );
}

export default Task;
