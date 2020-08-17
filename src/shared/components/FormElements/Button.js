import React from "react";
import './Button.css';

const Button = (props) => {
  return (
    <button
      className={`button button--${props.type}`}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
