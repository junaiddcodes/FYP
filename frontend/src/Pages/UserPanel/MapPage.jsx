import { Component, useEffect, useState } from "react";
import React from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import useGeoLocation from "../custom-hooks/useGeoLocation";
import { MdLocationPin } from "react-icons/md";
import gymService from "../../services/GymService";
import { Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom";
const MapPage = () => {
  const location = useGeoLocation();
  const [searchedGyms, setSearchedGyms] = useState();
  const [tooltip, setTooltip] = useState(false);
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBdLc31kclLs_2r72Uh0G88vBfYConu4BU",
  });
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
    getFeatureGyms();
  }, []);
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      {/* <h1>google maps</h1> */}
      {!location ? (
        <h3>User denied location</h3>
      ) : (
        <GoogleMap
          zoom={12}
          onClick={(e) => {
            let lati = e.latLng.lat();
            let lngi = e.latLng.lng();
            console.log(lati, lngi);
          }}
          center={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
          mapContainerClassName="map-container"
        >
          <Marker
            className="marker-geo"
            position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
          />
          {/* {searchedGyms.map((e, index) => {
            return (
          
            );
          })} */}
          {searchedGyms.map((e, index) => {
            return (
              <div key={index}>
                <InfoWindow position={{ lat: e.coordinates.lat, lng: e.coordinates.long }}>
                  <div onClick={() => navigate("/gym-description/" + e._id)}>
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
                    <div className="d-flex mb-0">
                      <MdLocationPin className="" />
                      <p className="" style={{ fontWeight: "bold" }}>
                        {e.location.city}
                      </p>
                    </div>
                    <p className="see-details"> See Details</p>
                  </div>
                </InfoWindow>
                <Marker
                  // onMouseOver={() => {
                  //   setTooltip(true);
                  // }}
                  // onMouseOut={() => {
                  //   setTooltip(false);
                  // }}
                  position={{ lat: e.coordinates.lat, lng: e.coordinates.long }}
                />
              </div>
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
};
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDWn0hNsE6KY6COpIZwAkcGbEksYOE9_eQ",
// })(MapContainer);

export default MapPage;
