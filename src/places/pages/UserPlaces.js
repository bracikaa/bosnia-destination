import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "./../components/PlaceList";

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
  {
    id: "p2",
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
    creator: "u2",
  },
  {
    id: "p3",
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
    creator: "u3",
  },
];

const UserPlaces = (props) => {
  const userId = useParams().userId;
  const filteredPlaces = DUMMY_PLACES.filter(
    (place) => place.creator === userId
  );
  return <PlaceList items={filteredPlaces} />;
};

export default UserPlaces;
