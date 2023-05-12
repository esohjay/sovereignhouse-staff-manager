import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";
import Btn from "../../components/Btn";

function Task() {
  const { id } = useParams();
  const {} = useAuth();
  const navigate = useNavigate();
  return (
    <section className="p-8">
      <section className=" ">
        <div className="grid grid-cols-2 gap-3 mb-7 font-medium  w-fit">
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
