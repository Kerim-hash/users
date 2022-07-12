import React, { useState } from "react";
import * as yup from "yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";

import { instance } from "../../core/axios";
import "./auth.css";

const RegisterForm = yup
  .object({
    username: yup.string().required("Enter your username"),
    email: yup
      .string()
      .email("email must be a valid email")
      .required("Enter your email"),
    birthday: yup.string().required("Enter your birthday"),
    gender: yup.string().required("Enter your gender"),
    password: yup
      .string()
      .min(8)
      .required("Password must be at least 8 characters"),
  })
  .required();

const Register = () => {
  let navigate = useNavigate();
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterForm),
  });

  // state

  const [response, setResponse] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const onSubmit = async (data) => {
    setResponse({ loading: true });
    await instance
      .post("/auth/signup", data)
      .then(({ data }) => {
        toast.success(data.message);
        setResponse({ success: true });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.message);
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
          <h4 className="auth-title mb-10">Create an account</h4>
          <img
            className="auth-img"
            src="https://portal.lumoshive.com/assets/icons/Register.svg"
            alt="illustration"
          />
          <p className="auth-link">
            {" "}
            Already have an account? <NavLink to="/login">Log in</NavLink>{" "}
          </p>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="mb-10"
              type="text"
              placeholder="User Name"
              error={!!errors.username}
              {...register("username", { required: true, maxLength: 80 })}
            />
            <p className="error-message">{errors.username?.message}</p>
            <input
              className="mb-10"
              type="text"
              placeholder="Email"
              error={!!errors.email}
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <p className="error-message">{errors.email?.message}</p>
            <input
              className="mb-10"
              type="date"
              placeholder="birthday"
              error={!!errors.birthday}
              {...register("birthday")}
            />
            <p className="error-message">{errors.birthday?.message}</p>
          
            <select {...register("gender")}  className="mb-10">
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <p className="error-message">{errors.gender?.message}</p>
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
                animate: response.loading,
                error: response.error,
                success: response.success,
              })}
              disabled={response.loading || response.error || response.success}
            >
              {response.loading || response.error || response.success
                ? ""
                : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
