import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/Avatar";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <div>
        <Link to={`/${props.id}/places`} style={{ textDecoration: "none" }}>
          <div className="user-item__avatar">
            <Avatar
              src={`http://localhost:5000/${props.image}`}
              alt={props.name}
            />
          </div>
          <div>
            <h2 className="user-item__name">{props.name}</h2>
            <h3 className="user-item__count">
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default UserItem;
