import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import Btn from "../../components/Btn";

function StudentApplication() {
  const { id } = useParams();
  const {} = useAuth();
  const navigate = useNavigate();
  return (
    <section className="p-8">
      <section className=" ">
        <div className="grid grid-cols-2 gap-3 mb-7 font-medium  w-fit">
          <Btn
            text={"applications"}
            onClick={() => navigate(`/vms/${id}/admin/students-application`)}
          />
          <a
            type="button"
            download
            href={`${
              import.meta.env.VITE_BACKEND_LINK
            }/students-application/applicants_list.xlsx`}
            target="_blank"
            className="inline-block rounded bg-mainColor px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-mainColor transition duration-150 ease-in-out hover:bg-altColor hover:shadow-altColor focus:bg-altColor focus:shadow-altColor focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-green-500"
          >
            Export Excelsheet
          </a>
        </div>
        <article className="bg-white shadow-md rounded-md min-h-[50vh] ">
          <Outlet />
        </article>
      </section>
    </section>
  );
}

export default StudentApplication;
