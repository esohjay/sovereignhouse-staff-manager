import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { countries } from "../lib/countries";
import generateRandomString from "../lib/generatePassword";
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
    maritalStatus: Yup.string().required("marital status is required"),
    gender: Yup.string().required("gender is required"),
    nationality: Yup.string().required("nationality is required"),
    address: Yup.string().required("address is required"),
    religion: Yup.string().required("religion is required"),
    jobPosition: Yup.string().required("jobPosition is required"),
    contractType: Yup.string().required("contractType is required"),
    status: Yup.string().required("status is required"),
    phone: Yup.number().required("phone is required"),
    placeOfBirth: Yup.string().required("placeOfBirth is required"),
    dateOfBirth: Yup.date().required("date of birth is required"),
    email: Yup.string().email().required("email is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const onSubmit = (data) => {
    const password = generateRandomString();
    dispatch(signUpWithEmailAndPassword({ ...data, password }));
  };
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user]);
  console.log(user);
  return (
    <article className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="w-full grid md:grid-cols-3 gap-x-3">
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
              htmlFor="maritalStatus"
              className="capitalize font-medium mb-1 block text-sm"
            >
              gender
            </label>
            <select
              {...register("gender")}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">{errors.gender?.message}</span>
            )}
          </div>
        </article>
        <article className="w-full grid md:grid-cols-3 gap-x-3">
          {/* DOB */}
          <div className="mb-3">
            <label
              htmlFor="dateOfBirth"
              className="capitalize font-medium mb-1 block text-sm"
            >
              date of birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.dateOfBirth && (
              <span className="text-red-500">
                {errors.dateOfBirth?.message}
              </span>
            )}
          </div>
          {/* Place of Birth */}
          <div className="mb-3">
            <label
              htmlFor="placeOfBirth"
              className="capitalize font-medium mb-1 block text-sm"
            >
              place of birth
            </label>
            <input
              type="text"
              {...register("placeOfBirth", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.placeOfBirth && (
              <span className="text-red-500">
                {errors.placeOfBirth?.message}
              </span>
            )}
          </div>
          {/* Nationality */}
          <div className="mb-3">
            <label
              htmlFor="nationality"
              className="capitalize font-medium mb-1 block text-sm"
            >
              nationality
            </label>
            <select
              {...register("nationality")}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <span className="text-red-500">
                {errors.nationality?.message}
              </span>
            )}
          </div>
        </article>
        <article className="w-full grid md:grid-cols-3 gap-x-3 place-items-center">
          {/* Marital status */}
          <div className="mb-3 w-full">
            <label
              htmlFor="maritalStatus"
              className="capitalize font-medium mb-1 block text-sm"
            >
              marital status
            </label>
            <select
              {...register("maritalStatus")}
              className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="separated">Separated</option>
              <option value="other">Other</option>
            </select>
            {errors.maritalStatus && (
              <span className="text-red-500">
                {errors.maritalStatus?.message}
              </span>
            )}
          </div>
          {/* Religion */}
          <div className="mb-3 w-full">
            <label
              htmlFor="religion"
              className="capitalize font-medium mb-1 block text-sm"
            >
              religion
            </label>
            <input
              type="text"
              {...register("religion", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.religion && (
              <span className="text-red-500">{errors.religion?.message}</span>
            )}
          </div>
          {/* Address */}
          <div className="mb-3 w-full">
            <label
              htmlFor="address"
              className="capitalize font-medium mb-1 block text-sm"
            >
              address
            </label>
            <textarea
              type="text"
              {...register("address", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.address && (
              <span className="text-red-500">{errors.address?.message}</span>
            )}
          </div>
        </article>
        <article className="w-full grid md:grid-cols-3 gap-x-3">
          {/* email */}
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
          {/* phone */}
          <div className="mb-3">
            <label
              htmlFor="phone"
              className="capitalize font-medium mb-1 block text-sm"
            >
              phone
            </label>
            <input
              type="number"
              {...register("phone", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone?.message}</span>
            )}
          </div>
        </article>
        <article className="w-full grid md:grid-cols-3 gap-x-3">
          <div className="mb-3">
            <label
              htmlFor="jobPosition"
              className="capitalize font-medium mb-1 block text-sm"
            >
              job position
            </label>
            <input
              type="text"
              {...register("jobPosition", { required: true })}
              className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            />
            {errors.jobPosition && (
              <span className="text-red-500">{errors.email?.message}</span>
            )}
          </div>
          {/* Contract type */}
          <div className="mb-3 w-full">
            <label
              htmlFor="contractType"
              className="capitalize font-medium mb-1 block text-sm"
            >
              contract type
            </label>
            <select
              {...register("contractType")}
              className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select type</option>
              <option value="employee">Employee</option>
              <option value="volunteer">Volunteer</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="other">Other</option>
            </select>
            {errors.contractType && (
              <span className="text-red-500">
                {errors.contractType?.message}
              </span>
            )}
          </div>
          {/* Status */}
          <div className="mb-3 w-full">
            <label
              htmlFor="status"
              className="capitalize font-medium mb-1 block text-sm"
            >
              status
            </label>
            <select
              {...register("status")}
              className="p-2  rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && (
              <span className="text-red-500">{errors.status?.message}</span>
            )}
          </div>
        </article>
        <button className="bg-mainColor text-white capitalize font-medium rounded-md inline-block py-2 px-6">
          submit
        </button>
      </form>
    </article>
  );
}

export default NewStaff;
