import React from "react";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = (props) => {
  
  if (props.items.length === 0) {
    return <h1>No places! Start exploring Bosnia!</h1>;
  } else {
    return (
      <ul>
        {props.items.map((place) => {
          return (
            <PlaceItem
              key={place.id}
              id={place.id}
              image={place.image}
              title={place.title}
              description={place.description}
              address={place.address}
              creatorId={place.creator}
              coordinates={place.location}
            ></PlaceItem>
          );
        })}
      </ul>
    );
  }
};

export default PlaceList;
