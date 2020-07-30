import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Map from "../Map/Map";
import "./Modal.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {
  console.log(props);
  return (
    <div>
      <Dialog
        fullWidth={true}
        open={props.openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <p className="dialog_title-title">{props.name}</p>
        </DialogTitle>
        <DialogContent>
          <Map location={props.location}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
