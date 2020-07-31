import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ExploreIcon from "@material-ui/icons/Explore";
import EditIcon from "@material-ui/icons/Edit";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

import "./PlaceItem.css";

import Modal from "../../shared/components/Modal/Modal";

const PlaceItem = (props) => {
  const [open, setOpenModal] = useState(false);
  const openModalHandler = () => setOpenModal(true);
  const closeModalHandler = () => setOpenModal(false);

  return (
    <li>
      <Modal
        name={props.title}
        location={props.coordinates}
        openModal={open}
        onCancel={closeModalHandler}
      ></Modal>
      <div className="place-item-wrapper">
        <div className="place-item-gradient"></div>
        <img src={props.image} alt={props.title} />
      </div>
      <div>
        <div className="place-item-buttons">
          <IconButton
            className="icon-button"
            onClick={() => openModalHandler()}
            aria-label="delete"
          >
            <ExploreIcon style={{ color: deepOrange[50] }} />
          </IconButton>
          <IconButton className="icon-button" aria-label="edit">
            <EditIcon style={{ color: deepOrange[50] }} />
          </IconButton>
          <IconButton className="icon-button" aria-label="delete">
            <DeleteIcon style={{ color: deepOrange[50] }} />
          </IconButton>
        </div>
        <h2 className="place-item-title">{props.title}</h2>
        <h3 className="place-item-title">{props.address}</h3>
        <p className="place-item-title">{props.description}</p>
      </div>
    </li>
  );
};

export default PlaceItem;
