import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/Avatar";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <div>
        <Link to={`/${props.id}/places`}>
          <div className="user-item__avatar">
            <Avatar src={props.image} alt={props.name} />
          </div>
          <div>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default UserItem;
