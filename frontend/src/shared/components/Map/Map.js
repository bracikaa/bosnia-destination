import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import "./Map.css";

const Map = (props) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  console.log(process.env);

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap mapContainerStyle={mapStyles} zoom={16} center={props.location}>
        <Marker onLoad={onLoad} position={props.location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
