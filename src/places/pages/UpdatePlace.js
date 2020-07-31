import React from "react";
import { useParams } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import "./Places.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Bascarsija",
    description:
      "Bascarsija is Sarajevo's old bazaar and the historical and cultural center of the city.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Bascarsija_2016.jpg",
    address: "Baščaršija 1, Sarajevo 71000",
    location: {
      lat: 43.860266,
      lng: 18.431341,
    },
    creator: "u1",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    },
    true
  );

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return <h2>No places found</h2>;
  }

  return (
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
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 chraters)."
          onInput={inputHandler}
          value={formState.inputs.description.value}
          valid={formState.inputs.description.isValid}
        />
        <button type="submit" disabled={!formState.isValid}>
          Update Place
        </button>
      </form>
    </div>
  );
};

export default UpdatePlace;
