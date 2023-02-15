import React, { useEffect } from "react";

import { useNavigate, Outlet } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";

//redux
import {
  signUpWithEmailAndPassword,
  selectUser,
  logOut,
} from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Hrm() {
  const navigate = useNavigate();
  return (
    <section className="p-8">
      <section className=" bg-gray shadow-md rounded-md p-5">
        <div className="flex gap-x-3 mb-5">
          <button
            onClick={() => navigate("addstaff")}
            className="inline-block px-5 py-2 text-white bg-mainColor rounded-md capitalize"
          >
            new staff
          </button>
          <button
            onClick={() => navigate("allstaff")}
            className="inline-block px-5 py-2 text-white bg-mainColor rounded-md capitalize"
          >
            view staff
          </button>
        </div>
        <article>
          <Outlet />
        </article>
      </section>
    </section>
  );
}

export default Hrm;
