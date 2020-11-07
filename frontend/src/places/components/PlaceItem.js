import React, { useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ExploreIcon from "@material-ui/icons/Explore";
import EditIcon from "@material-ui/icons/Edit";
import { deepOrange } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

import "./PlaceItem.css";
import { AuthContext } from "../../shared/context/auht-context";
import MapModal from "../../shared/components/Modal/MapModal";
import Modal from "../../shared/components/Modal/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [open, setOpenModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openModalHandler = () => setOpenModal(true);
  const closeModalHandler = () => setOpenModal(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    cancelDeleteHandler();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        "DELETE"
      );

      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  const goToUpdate = () => {
    history.push(`/places/${props.id}`);
  };

  return (
    <li>
      <MapModal
        name={props.title}
        location={props.coordinates}
        openModal={open}
        onCancel={closeModalHandler}
      ></MapModal>
      <Modal
        openModal={showConfirmModal}
        onCancel={cancelDeleteHandler}
        onDelete={confirmDeleteHandler}
      ></Modal>
      <div className="place-item-wrapper">
        <div className="place-item-gradient"></div>
        <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
      </div>
      <div>
        <div className="place-item-buttons">
          <IconButton
            className="icon-button"
            onClick={() => openModalHandler()}
            aria-label="view"
          >
            <ExploreIcon style={{ color: deepOrange[50] }} />
          </IconButton>
          {auth.userid === props.creatorId && (
            <IconButton
              onClick={goToUpdate}
              className="icon-button"
              aria-label="edit"
            >
              <EditIcon style={{ color: deepOrange[50] }} />
            </IconButton>
          )}
          {auth.userid === props.creatorId && (
            <IconButton
              onClick={() => showDeleteWarningHandler()}
              className="icon-button"
              aria-label="delete"
            >
              <DeleteIcon style={{ color: deepOrange[50] }} />
            </IconButton>
          )}
        </div>
        <h2 className="place-item-title">{props.title}</h2>
        <h3 className="place-item-title">{props.address}</h3>
        <p className="place-item-title">{props.description}</p>
      </div>
    </li>
  );
};

export default PlaceItem;
