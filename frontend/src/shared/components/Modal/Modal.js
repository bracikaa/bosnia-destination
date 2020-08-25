import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

const Modal = (props) => {
  return (
    <div>
      <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={props.openModal}
        onClose={props.onCancel}
      >
        <DialogTitle id="alert-dialog-title">Place Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to proceed and delete this place? This action is not
            reversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.onCancel} autoFocus>
            Close
          </Button>
          <Button color="primary" onClick={props.onDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
