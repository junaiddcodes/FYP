import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import "./mapstyling.css";
// import { Icon } from "leaflet";
// import * as parkData from "./data/skateboard-parks.json";

const MapShow = ({ mapPin }) => {
  const [pins, SetPins] = useState([31.4878, 74.3646]);
  const animateRef = useRef(false);
  function SetViewOnClick({ animateRef }) {
    const map = useMap();
    console.log(mapPin)
    if (mapPin.length == 0) {
      SetPins([31.4878, 74.3646]);
    } else {
      SetPins(mapPin);
    }
    map.setView(pins, map.getZoom(), {
      animate: animateRef.current || false,
    });

    return null;
  }
  return (
    <MapContainer center={[31.4878, 74.3646]} zoom={12} scrollWheelZoom={false}>
      <SetViewOnClick animateRef={animateRef} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pins}>
        <Popup>Gym Location</Popup>
      </Marker>
    </MapContainer>
  );

  // render(
  //     <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
  //       <TileLayer
  //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //       />
  //       <Marker position={position}>
  //         <Popup>
  //           A pretty CSS3 popup. <br /> Easily customizable.
  //         </Popup>
  //       </Marker>
  //     </MapContainer>,
  //   )
};
export default MapShow;
