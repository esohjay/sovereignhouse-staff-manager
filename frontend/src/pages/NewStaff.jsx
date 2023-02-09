import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";

//redux
import { signUpWithEmailAndPassword, selectUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function NewStaff() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("last name is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const onSubmit = (data) => {
    dispatch(signUpWithEmailAndPassword(data));
  };
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user]);
  console.log(user);
  return (
    <article className="w-full bg-gray rounded-lg shadow-md max-w-sm p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label
            htmlFor="firstName"
            className="capitalize font-medium mb-1 block text-sm"
          >
            first name
          </label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
          />
          {errors.firstName && (
            <span className="text-red-500 ">{errors.firstName?.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="lastName"
            className="capitalize font-medium mb-1 block text-sm"
          >
            last name
          </label>
          <input
            type="text"
            {...register("lastName", { required: true })}
            className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName?.message}</span>
          )}
        </div>
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
        <div className="mb-3">
          <label
            htmlFor="confirmPassword"
            className="capitalize font-medium mb-1 block text-sm"
          >
            confirm password
          </label>
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 ">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
        <button className="bg-mainColor text-white capitalize font-medium rounded-md inline-block py-2 px-6">
          submit
        </button>
      </form>
    </article>
  );
}

export default NewStaff;
