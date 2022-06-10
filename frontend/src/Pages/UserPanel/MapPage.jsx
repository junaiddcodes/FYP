import { Component } from "react";
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import useGeoLocation from "../custom-hooks/useGeoLocation";
const MapPage = () => {
  const location = useGeoLocation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBdLc31kclLs_2r72Uh0G88vBfYConu4BU",
  });
  const addMarker = (location, map) => {
    this.setState((prev) => ({
      fields: {
        ...prev.fields,
        location,
      },
    }));
    map.panTo(location);
  };
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
            let lat = e.latLng.lat();
            let lng = e.latLng.lat();
            console.log(lat, lng);
          }}
          center={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
          mapContainerClassName="map-container"
        >
          <Marker position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }} />
        </GoogleMap>
      )}

      {/* <h4>{location.loaded ? JSON.stringify(location) : "Location data not available yet"}</h4> */}
    </div>
  );
};
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDWn0hNsE6KY6COpIZwAkcGbEksYOE9_eQ",
// })(MapContainer);

export default MapPage;
