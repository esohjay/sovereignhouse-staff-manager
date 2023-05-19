import React, { useEffect } from "react";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";

function ExpensesContainer() {
  const navigate = useNavigate();
  const {} = useAuth();
  const { id } = useParams();
  const isAdmin = Cookies.get("isAdmin")
    ? JSON.parse(Cookies.get("isAdmin"))
    : null;
  return (
    <section className="p-5 md:p-8">
      <section className=" ">
        {!isAdmin && (
          <div className="grid grid-cols-2 gap-3 mb-7 font-medium  w-fit">
            <NavLink
              to={`/vms/${id}/expenses`}
              className={({ isActive }) =>
                isActive
                  ? "inline-block px-3 tex-xs py-2 text-white text-center rounded-md shadow-md bg-mainColor capitalize hover:bg-lightGreen hover:text-mainColor"
                  : "inline-block px-3 tex-xs py-2 text-mainColor text-center rounded-md shadow-md bg-white capitalize hover:bg-lightGreen"
              }
            >
              expenses
            </NavLink>
            <NavLink
              to={`/vms/${id}/expenses/add`}
              className={({ isActive }) =>
                isActive
                  ? "inline-block px-3 tex-xs py-2 text-white bg-mainColor text-center rounded-md shadow-md capitalize hover:bg-lightGreen hover:text-mainColor"
                  : "inline-block px-3 tex-xs py-2 text-mainColor bg-white text-center rounded-md shadow-md capitalize hover:bg-lightGreen"
              }
            >
              add expense
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

export default ExpensesContainer;
