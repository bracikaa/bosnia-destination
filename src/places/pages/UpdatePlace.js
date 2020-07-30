import React from "react";
import { useParams } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import Input from "../../shared/components/FormElements/Input";

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

  if (!identifiedPlace) {
    return <h2>No places found</h2>;
  }

  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 chraters)."
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
    </form>
  );
};

export default UpdatePlace;
