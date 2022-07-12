import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Header from "../../components/header";
import { instance } from "../../core/axios";
import { fileToDataUri } from "../../util/fileToUri";
import "./index.css";

const userForm = yup
  .object({
    username: yup
      .string()
      .required("Enter your username"),
    password: yup
      .string()
      .min(8)
      .required("Password must be at least 8 characters"),
  })
  .required();


const Account = () => {

  const navigate = useNavigate()
  // state
  const [user, setUset] = useState({});
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  // get user by token
  useEffect(() => {
    instance
      .get("/route/account")
      .then(({ data }) => {
        setUset(data.data);
      })
      .catch((err) => {
        console.log(err)
      });

    return () => {};
  }, []);



  const handleChange = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        fileToDataUri(event.target.files[0]).then((dataUri) => {
          setImages(dataUri);
          setFile(file);
        });
      }
    
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userForm),
  });

  const onSubmit = async (data) => {

      var form = new FormData();
      if(!file){
        toast.error('photo fields are required');
      }
      form.append("photo", file);
      form.append("username", data.username);
      form.append("password", data.password);
      file && setLoading(true)
      file && 
      instance.put('/route/account', form)
      .then(({ data }) => {
        toast.success(data.message);
        setTimeout(() => {
            navigate("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false))

  };
  return (
    <div className="account">
      <Header />
      <div className="container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="file"
            onChange={handleChange}
            id="upload"
            accept="image/*"
            style={{ display: "none" }}
          />
          <label htmlFor="upload">
            <img
              id="avatar"
              className="account-img"
              src={
                images
                  ? images
                  : user.photo
                  ? user.photo
                  :  user.gender === "male" ? "https://cdn-icons-png.flaticon.com/128/7970/7970226.png" :"https://ibdfam.org.br/posgraduacao/assets/img/about-extra-1.svg"
              }
              alt="userPhoto"
            />
          </label>
          <label htmlFor="avatar" />
        </div>
        <input className="mb-20" type="text" defaultValue={user.username}   {...register("username", { required: true })}/>
        <p className="error-message">{errors.username?.message}</p>
        <input type="password" placeholder="Enter new your password"   {...register("password", { required: true, })}/>
        <p className="error-message">{errors.password?.message}</p>
        <button type="submit" className="account-button" disabled={loading}>{loading? "....." : 'Update'}</button>
        </form>
      </div>
    </div>
  );
};

export default Account;
