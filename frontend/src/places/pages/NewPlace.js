import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auht-context";

import Loader from "../../shared/components/Loader/Loader";
import Button from "../../shared/components/FormElements/Button";
import "./Places.css";

const NewPlace = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userid);
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:5000/api/places", "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="form-wrapper">
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title: "
            errorText="Please enter a valid title."
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            type="text"
            label="Description: "
            rows="7"
            errorText="Please enter a valid description (at least 5 characters)."
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
          />
          <Input
            id="address"
            element="input"
            type="text"
            label="Address: "
            errorText="Please enter a valid address."
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="Please upload an image."
          />
          <Button type="submit" disabled={!formState.isValid}>
            New Place
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NewPlace;
