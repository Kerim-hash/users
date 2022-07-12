import React, { useState } from "react";
import * as yup from "yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import cookie from "cookie_js";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

import { instance } from "../../core/axios";
import "./auth.css";

const LoginForm = yup
  .object({
    email: yup
      .string()
      .email("email must be a valid email")
      .required("Enter your email"),
    password: yup
      .string()
      .min(8)
      .required("Password must be at least 8 characters"),
  })
  .required();

const Login = () => {
  let navigate = useNavigate();
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginForm),
  });

  // state

  const [response, setResponse] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const onSubmit = async (data) => {
    setResponse({ loading: true });
    instance
      .post("/auth/login", data)
      .then(({ data }) => {
        toast.success(data.message);
        cookie.set("token", data.token);
        instance.defaults.headers.Authorization = `Bearer ${data.token}`;
        localStorage.setItem("user", JSON.stringify(data.user));
        setResponse({ success: true });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setResponse({ error: true });
      });
    setTimeout(() => {
      setResponse({ loading: false, success: false, error: false });
    }, 1500);
  };


  return (
    <div className="container">
      <div className="auth">
        <div className="auth-wrapper">
          <h4 className="auth-title mb-20">Log in to your personal account</h4>
          <img
            className="auth-img"
            src="https://plagiarismdetector.net/img/illustration.svg"
            alt="illustration"
          />
          <p className="auth-link">
            {" "}
            No account yet? <NavLink to="/register">Sign up</NavLink>{" "}
          </p>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="mb-10"
              type="text"
              placeholder="Email"
              error={!!errors.email}
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <p className="error-message">{errors.email?.message}</p>
            <input
              className="mb-10"
              type="password"
              placeholder="Enter your password"
              error={!!errors.password}
              {...register("password", { required: true })}
            />
            <p className="error-message">{errors.password?.message}</p>
            <button
              type="submit"
              className={classnames("button", {
                "animate": response.loading,
                "error": response.error,
                "success": response.success,
              })}
              disabled={response.loading || response.error || response.success}
            >
              {response.loading || response.error || response.success
                ? ""
                : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
