import React from "react";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { deepOrange } from "@material-ui/core/colors";

import "./Footer.css";

const Footer = () => {
  const goToHref = (link) => {
    if (link === "github") {
      window.location.href = "https://github.com/bracikaa";
    } else if (link === "linkedin") {
      window.location.href =
        "https://www.linkedin.com/in/mehmed-duhovic-7b066bb1/?originalSubdomain=ba";
    }
  };
  return (
    <div className="footer">
      <div className="footer__left">
        <p>Bosnia Travel Guide</p>
        <p>Made by: Mehmed Duhovic © 2020</p>
      </div>
      <div className="footer__right">
        <p>Contact Me:</p>
        <IconButton
          className="icon-button"
          onClick={() => goToHref("github")}
          aria-label="github"
        >
          <GitHubIcon style={{ color: deepOrange[50] }} />
        </IconButton>
        <IconButton
          className="icon-button"
          onClick={() => goToHref("linkedin")}
          aria-label="linkedin"
        >
          <LinkedInIcon style={{ color: deepOrange[50] }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
