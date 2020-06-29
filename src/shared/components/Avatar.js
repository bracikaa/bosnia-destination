import React from "react";
import './Avatar.css';

const Avatar = (props) => {
  return <img className="user-avatar__image" src={props.src} alt={props.alt} />
};

export default Avatar;
