import React, { useEffect, useState } from "react";

import { instance } from "../../core/axios";
import UserItem from "../../components/userItem";
import "./index.css";
import Header from "../../components/header";

const Main = () => {
  const [people, setPeople] = useState([]);
  const [response, setResponse] = useState({ message: "", loading: true });
  useEffect(() => {
    instance
      .get("/route/people")
      .then(({ data }) => {
        setResponse({ message: data.message });
        setPeople(data.data);
      })
      .catch((err) => {
        setResponse({ message: err.response.data.message });
      })
      .finally(() => {
        setResponse((prevState) => {
          return {
            ...prevState,
            loading: false,
          };
        });
      });
  }, []);


  console.log(response)
  return (
    <div className="main-wrapper">
      <Header />
      <main className="main">
        {response.loading ? (
          <img
            className="main-loading"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
            alt="loading"
          />
        ) : response.message ? (
          <p className="main-error">{response.message}</p>
        ) : (
          <div className="main-items">
            {people &&
              people.map((item) => {
                return <UserItem {...item} />;
              })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Main;
