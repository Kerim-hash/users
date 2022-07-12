import React from "react";
import { format } from "date-fns";

import "./index.css";
const UserItem = ({ photo, username, birthday, gender }) => {
  var d = new Date(birthday);
  return (
    <div className="user">
      <img
        className="user-img"
        src={
          photo
            ? photo
            :  gender === "male" ? "https://cdn-icons-png.flaticon.com/128/7970/7970226.png" :"https://ibdfam.org.br/posgraduacao/assets/img/about-extra-1.svg"
        }
        alt="photoUser"
      />
      <h6 className="user-name">{username}</h6>
      <div className="user-gender">gender:{ <img className="user-gender__img" src={gender === "male"? "https://cdn4.iconfinder.com/data/icons/ui-solic/24/Male-512.png": "https://cdn2.iconfinder.com/data/icons/healthcare-medical-flat/2048/258_-_Female_symbol-512.png"} alt="gender" />}</div>
      <time className="user-date">{birthday && format(d, "dd.MM.yyyy")}</time>
    </div>
  );
};

export default UserItem;
