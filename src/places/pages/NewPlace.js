import React from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Places.css";

const NewPlace = (props) => {
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
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
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
        <button type="submit" disabled={!formState.isValid}>
          Add Place
        </button>
      </form>
    </div>
  );
};

export default NewPlace;
