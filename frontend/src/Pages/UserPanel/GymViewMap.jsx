import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useNavigate, useLocation } from "react-router-dom";
import gymService from "../../services/GymService";
import "./mapstyling.css";
import { MdLocationPin } from "react-icons/md";
import { useLoadScript } from "@react-google-maps/api";
// import { Icon } from "leaflet";
// import * as parkData from "./data/skateboard-parks.json";
import useGeoLocation from "../custom-hooks/useGeoLocation";
import L from "leaflet";
import image from "../../Pages/HomePanel/images/pin-map.png";
const GymViewMap = () => {
  const location = useGeoLocation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBdLc31kclLs_2r72Uh0G88vBfYConu4BU",
  });

  function GetIcon(_iconSize) {
    return L.icon({
      iconUrl: image,
      iconSize: [_iconSize],
    });
  }
  // let arrayOfPins = [
  //   [31.4005, 74.2093],
  //   [31.4025, 74.2033],
  //   [31.4035, 74.2043],
  //   [31.4848, 74.3656],
  //   [31.4859, 74.3666],
  // ];
  const navigate = useNavigate();

  const [isLocation, setIsLocation] = useState(true);
  const [mapPin, setMapPin] = useState([]);
  const [searchedGyms, setSearchedGyms] = useState([]);
  function SetViewOnClick({ animateRef }) {
    const map = useMap();
    map.setView([location.coordinates?.lat, location.coordinates?.lng], map.getZoom(), {
      animate: animateRef.current || false,
    });

    return null;
  }
  const animateRef = useRef(false);
  function getFeatureGyms() {
    gymService
      .get_all_gyms()
      .then((res) => {
        setSearchedGyms(res.crud);

        console.log(res.crud);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // if (location.state) {
    //   console.log(location.state);
    //   var temp = [location.state.data.latitude, location.state.data.longitude];
    //   console.log(temp);
    //   setMapPin(temp);
    // } else {
    //   setMapPin([22, 22]);
    // }
    getFeatureGyms();
    // console.log(location.coordinates.lat);
    // console.log(location.coordinates.lng);
    console.log(location.loaded);
    if (location.loaded == false) {
      setIsLocation(false);
    } else if (location.loaded == true) {
      setIsLocation(true);
    }
  }, [location]);

  // var data = location.state.e;
  return (
    <div>
      <Button
        className="m-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i class="bx bx-arrow-back m-1"></i> Back
      </Button>
      {isLocation ? (
        <div className="map-pop">
          {mapPin}

          <MapContainer
            center={[location.coordinates?.lat, location.coordinates?.lng]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SetViewOnClick animateRef={animateRef} />

            <Marker
              position={{ lat: location.coordinates?.lat, lng: location.coordinates?.lng }}
              icon={GetIcon(60)}
            >
              <Popup isOpen={true}>
                <p className="text-size-small">Your location</p>
              </Popup>
            </Marker>
            {searchedGyms.map((e) => {
              return (
                <Marker position={{ lat: e.coordinates.lat, lng: e.coordinates.long }}>
                  <Popup>
                    <div>
                      <h4>{e.user_id.full_name}</h4>
                      <h6>Membership Price: {e.gym_membership_price} pkr</h6>
                      {!e.numReviews ? (
                        <h6 className="">No reviews yet</h6>
                      ) : (
                        <h6 className="">
                          <i class="mt-1 text-warning bx bxs-star"></i> {e.rating}{" "}
                          <span className="text-secondary">({e.numReviews})</span>{" "}
                        </h6>
                      )}
                      <div className="d-flex  mb-0">
                        <MdLocationPin className="m-1" style={{ height: "1rem", width: "1rem" }} />
                        <p className="m-0" style={{ fontWeight: "bold" }}>
                          {e.location.city}
                        </p>
                      </div>
                      <p
                        className="see-details"
                        onClick={() => navigate("/gym-description/" + e._id)}
                      >
                        {" "}
                        See Details
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* <Marker position={[51.405, -0.08]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
          </MapContainer>
        </div>
      ) : (
        <h3>Map couldn't load please enable location</h3>
      )}
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
