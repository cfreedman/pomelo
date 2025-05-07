import { JSX, useRef, createContext, RefObject } from "react";

import TwoColumn from "@/components/layout/TwoColumn";
import { MapRef } from "react-map-gl/mapbox";
import StoresMap from "@/components/StoresMap";

interface Store {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const storeList: Store[] = [
  {
    name: "Whole Foods",
    address: "123 Main St, Philadelphia, PA 19123",
    latitude: 39.9429,
    longitude: -75.1577,
  },
  {
    name: "Costco",
    address: "3245 Cherry St, Haddonfield, PA 19467",
    latitude: 39.9274,
    longitude: -75.04,
  },
  {
    name: "Espositos",
    address: "921 9th St, Philadelphia, PA 19147",
    latitude: 39.93757,
    longitude: -75.1581,
  },
];

export const MapContext = createContext<RefObject<MapRef | null>>({
  current: null,
});

export default function StoresPage(): JSX.Element {
  const mapRef = useRef<MapRef>(null);

  const handleStoreClick = (latitude: number, longitude: number) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
    });
  };

  return (
    <MapContext.Provider value={mapRef}>
      <TwoColumn
        left={
          <>
            <h1>Favorite Stores</h1>
            <ul>
              {storeList.map(({ name, address, latitude, longitude }) => (
                <li key={name}>
                  <label>
                    <h3>{name}</h3>
                    <p>{address}</p>
                    <button
                      type="button"
                      onClick={() => handleStoreClick(latitude, longitude)}
                    ></button>
                  </label>
                </li>
              ))}
            </ul>
          </>
        }
        right={<StoresMap />}
      />
    </MapContext.Provider>
  );
}
