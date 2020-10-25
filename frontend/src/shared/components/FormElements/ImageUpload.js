import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import "./ImageUpload";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const filePicked = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
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
        {preview && <img src={preview} alt="Preview" />}
        {!preview && <p>Please select an image!</p>}
      </div>

      <Button type="button" onClick={pickImageHandler}>
        Choose Image
      </Button>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
