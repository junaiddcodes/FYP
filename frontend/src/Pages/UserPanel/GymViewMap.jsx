import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate, useLocation } from "react-router-dom";
import "./mapstyling.css";
// import { Icon } from "leaflet";
// import * as parkData from "./data/skateboard-parks.json";

const GymViewMap = () => {
  let arrayOfPins = [
    [31.4868, 74.3636],
    [31.4878, 74.3646],
    [31.4888, 74.3656],
    [31.4898, 74.3666],
    [31.4889, 74.3676]
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [mapPin, setMapPin] = useState([]);
  function SetViewOnClick({ animateRef }) {
    const map = useMap();
    map.setView(mapPin, map.getZoom(), {
      animate: animateRef.current || false,
    });

    return null;
  }
  const animateRef = useRef(false);

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      var temp = [location.state.data.latitude, location.state.data.longitude];
      console.log(temp);
      setMapPin(temp);
    } else {
      setMapPin([22, 22]);
    }
  }, []);

  // var data = location.state.e;
  return (
    <div className="map-pop">
      {mapPin}

      <MapContainer center={[21.5, 73.5]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick animateRef={animateRef} />

        {arrayOfPins.map((e)=>{
          return(
            <Marker position={e}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          )

        })}

        {/* <Marker position={[51.405, -0.08]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
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
export default GymViewMap;
