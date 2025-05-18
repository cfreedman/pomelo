import { JSX, useState, useContext } from "react";

import { SearchBox } from "@mapbox/search-js-react";
import Map from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapContext } from "@/pages/StoresPage";
import { StoreCreate } from "@/lib/stores";
import { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";

interface StoresMapProps {
  handleLoaded: () => void;
  handleStoreSearch: (store: StoreCreate) => void;
}

export default function StoresMap({
  handleLoaded,
  handleStoreSearch,
}: StoresMapProps): JSX.Element {
  const [searchValue, setSearchValue] = useState("");
  const mapRef = useContext(MapContext);

  const philadelphiaView = {
    longitude: -75.16,
    latitude: 39.95,
    zoom: 14,
  };

  const handleSearchRetrieval = (res: SearchBoxRetrieveResponse) => {
    const topResult = res.features[0];

    const { full_address, coordinates, name } = topResult.properties;
    const searchedStore: StoreCreate = {
      name,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      address: full_address,
    };

    handleStoreSearch(searchedStore);
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
        onRetrieve={handleSearchRetrieval}
      />
      <Map
        ref={mapRef}
        onLoad={handleLoaded}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={philadelphiaView}
        mapStyle=""
      />
    </div>
  );
}
