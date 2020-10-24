import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from '../../shared/context/auht-context';
import { useHttpClient } from "../../shared/hooks/http-hook";
import Loader from "../../shared/components/Loader/Loader";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./Places.css";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        console.log(responseData);
        setLoadedPlaces(responseData.places);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
        console.log(responseData);
      } catch (err) {}
    };

    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
    await sendRequest(
      `http://localhost:5000/api/places/${placeId}`,
      "PATCH",
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
      {
        "Content-Type": "application/json",
      }
    );
    console.log(auth);
    history.push('/' + auth.userid + '/places');
    }
    catch(err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loader></Loader>}
      {!isLoading && loadedPlaces && (
        <div className="form-wrapper">
          <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
              value={loadedPlaces.title}
              valid={true}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (min. 5 chraters)."
              onInput={inputHandler}
              value={loadedPlaces.description}
              valid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              Update Place
            </Button>
          </form>
        </div>
      )}
      {!isLoading && !loadedPlaces && <h2>No places found</h2>}
    </React.Fragment>
  );
};

export default UpdatePlace;
