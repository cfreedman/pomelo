import { JSX, useRef, useState } from "react";

import { SearchBox } from "@mapbox/search-js-react";

import Map, { MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function StoresMap(): JSX.Element {
  const mapRef = useRef<MapRef>();
  const [seachValue, setSearchValue] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  const philadelphiaView = {
    longitude: -75.16,
    latitude: 39.95,
    zoom: 14,
  };

  return (
    <div>
      <SearchBox
        accessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        options={{
          language: "en",
          country: "us",
        }}
        onChange={(e) => setSearchValue(e)}
        marker
      />
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={philadelphiaView}
        mapStyle=""
      />
    </div>
  );
}
