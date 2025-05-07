import { JSX, useState, useContext } from "react";

import { SearchBox } from "@mapbox/search-js-react";
import Map from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapContext } from "@/pages/StoresPage";

export default function StoresMap(): JSX.Element {
  const [searchValue, setSearchValue] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useContext(MapContext);

  const philadelphiaView = {
    longitude: -75.16,
    latitude: 39.95,
    zoom: 14,
  };

  return (
    <div className="h-[800px] relative">
      {/* @ts-expect-error I don't know why this error is happening with SearchBox*/}
      <SearchBox
        accessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        options={{
          language: "en",
          country: "us",
        }}
        map={mapRef.current?.getMap()}
        mapboxgl={mapboxgl}
        value={searchValue}
        onChange={(e) => setSearchValue(e)}
        marker={true}
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
