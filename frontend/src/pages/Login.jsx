import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";

//redux
import {
  logInWithEmailAndPassword,
  selectUser,
  selectCurrentUser,
} from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector(selectCurrentUser);
  const user = useSelector(selectUser);
  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  //   const { user } = useAuth();
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const onSubmit = (data) => {
    dispatch(logInWithEmailAndPassword(data));
  };
  useEffect(() => {
    if (user) {
      navigate(`/admin/${user?.id}`);
    }
  }, [user]);
  //   useEffect(() => {
  //     if (formData) {
  //       dispatch(
  //         logInWithEmailAndPassword({
  //           email: formData?.email,
  //           password: formData?.password,
  //         })
  //       );
  //     }
  //   }, [formData]);
  //   useEffect(() => {
  //     if (user) {
  //       console.log(user);
  //       console.log(formData);
  //     }
  //   }, [user]);
  return (
    <section className="bg-mainColor px-5 flex flex-col justify-center items-center gap-y-5 py-24 min-h-screen">
      <figure>
        <img src={logo} alt="logo" />
      </figure>
      <article className="w-full bg-gray rounded-lg shadow-md max-w-sm p-5">
        <h3 className="uppercase text-center font-medium">login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="capitalize font-medium mb-1 block text-sm"
            >
              email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email?.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="capitalize font-medium mb-1 block text-sm"
            >
              password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password?.message}</span>
            )}
          </div>
          <button className="bg-mainColor text-white capitalize font-medium rounded-md inline-block py-2 px-6">
            submit
          </button>
        </form>
      </article>
    </section>
  );
}

export default Login;
