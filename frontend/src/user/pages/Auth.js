import React, { useState, useContext } from "react";
import Button from "./../../shared/components/FormElements/Button";
import Input from "./../../shared/components/FormElements/Input";
import Loader from "./../../shared/components/Loader/Loader";
import ImageUpload from "./../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auht-context";
import "./Auth.css";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    clearError();
    if (!isLoginForm) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginForm((isLoginFormState) => !isLoginFormState);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginForm) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="form-wrapper">
      {error && <p className="error">{error}</p>}
      {isLoading && <Loader></Loader>}
      <form className="place-form" onSubmit={formSubmitHandler}>
        {!isLoginForm && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        />
        {!isLoginForm && (
          <ImageUpload id="image" onInput={inputHandler}></ImageUpload>
        )}
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginForm ? "Login" : "Register"}
        </Button>
      </form>
      <Button onClick={switchModeHandler}>
        Switch to {isLoginForm ? "Signup" : "Login"}
      </Button>
    </div>
  );
};

export default Auth;
