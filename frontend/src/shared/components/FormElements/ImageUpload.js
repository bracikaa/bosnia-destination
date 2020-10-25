import React, { useRef } from "react";
import Button from "./Button";
import "./ImageUpload";

const ImageUpload = (props) => {
  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const filePicked = (event) => {
    console.log(event.target);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        type="file"
        ref={filePickerRef}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={filePicked}
      />
      <div className="preview">
        <img src="" alt="Preview" />
      </div>

      <Button type="button" onClick={pickImageHandler}>
        Choose Image
      </Button>
    </div>
  );
};

export default ImageUpload;
