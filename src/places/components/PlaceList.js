import React from "react";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return <h1>No places! Start exploring Bosnia!</h1>;
  }

  return (
    <ul>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        ></PlaceItem>
      ))}
    </ul>
  );
};

export default PlaceList;