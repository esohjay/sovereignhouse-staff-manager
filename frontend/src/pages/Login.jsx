import React, { useEffect } from "react";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";
import Modal from "../components/Modal";

//redux
import {
  logInWithEmailAndPassword,
  selectUser,
  selectError,
  selectCurrentUser,
  selectResetPassword,
  selectStatus,
  resetPassword,
} from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { password } = useParams();
  const [searchParams] = useSearchParams();
  const error = useSelector(selectError);
  const loginStatus = useSelector(selectStatus);
  const resetLinkSent = useSelector(selectResetPassword);
  // const user = useSelector(selectCurrentUser);
  const user = useSelector(selectUser);
  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;
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
    getValues,
    setError,
    formState: { errors },
  } = useForm(formOptions);
  const onSubmit = (data) => {
    dispatch(logInWithEmailAndPassword(data));
  };
  useEffect(() => {
    if (user) {
      navigate(`/vms/${user?.id}/dashboard`);
    }
  }, [user]);
  const handleSendPwReset = () => {
    if (!getValues("resetEmail")) {
      setError("resetEmail", { type: "required" });
      return;
    }
    dispatch(resetPassword({ email: getValues("resetEmail") }));
  };
  useEffect(() => {
    if (searchParams.get("password") && searchParams.get("email")) {
      dispatch(
        logInWithEmailAndPassword({
          email: searchParams.get("email"),
          password: searchParams.get("password"),
        })
      );
    }
  }, []);
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
              <div className="text-red-500">{errors.password?.message}</div>
            )}
            {error && error.name === "FirebaseError" ? (
              <div className="text-red-500">
                {error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
                  ? "Email or password is incorrect"
                  : "Unable to process your request with the given details. Try again later"}
              </div>
            ) : (
              ""
            )}
          </div>
          <Modal
            style="bg-transparent  text-base font-medium pt-2 leading-normal mb-3 text-mainColor  transition duration-150 ease-in-out hover:text-altColor    focus:outline-none focus:ring-0 "
            btnText="Forgot password"
            targetId="forgotPw"
            modalTitle={`Enter your email address`}
            confirmText="send"
            action={handleSendPwReset}
            // size="small"
          >
            <div className="w-full">
              <input
                data-te-select-init
                {...register("resetEmail")}
                className="w-full p-3 rounded-md border border-mainColor focus:outline-none"
              />
            </div>
          </Modal>
          {errors.resetEmail && (
            <div className="text-red-500">Email is required</div>
          )}
          {resetLinkSent && (
            <div className="text-green-500">
              A reset link has been sent to the email address provided.
            </div>
          )}
          {loginStatus === "pending" && <Loader text="Logging in..." />}
          <button
            disabled={loginStatus === "pending"}
            className="bg-mainColor text-white capitalize font-medium rounded-md inline-block py-2 px-6"
          >
            submit
          </button>
        </form>
      </article>
    </section>
  );
}

export default Login;
