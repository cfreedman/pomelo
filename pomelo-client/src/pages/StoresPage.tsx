import { JSX, useRef, createContext, RefObject, useState } from "react";

import TwoColumn from "@/components/layout/TwoColumn";
import { MapRef } from "react-map-gl/mapbox";
import StoresMap from "@/components/StoresMap";
import Marker from "@/components/Marker";
import MapPopup from "@/components/MapPopup";
import { Store } from "@/lib/stores";
import { dummyStores } from "@/dummy/stores";

export const MapContext = createContext<RefObject<MapRef | null>>({
  current: null,
});

export default function StoresPage(): JSX.Element {
  const mapRef = useRef<MapRef>(null);
  const [isMapReady, setMapReady] = useState(false);
  const [activeStore, setActiveStore] = useState<Store | null>(null);

  const handleStoreClick = (latitude: number, longitude: number) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
    });
  };

  const handleMarkerClick = (store: Store) => {
    setActiveStore(store);
  };

  return (
    <MapContext.Provider value={mapRef}>
      <TwoColumn
        left={
          <>
            <h1>Favorite Stores</h1>
            <ul>
              {dummyStores.map(({ name, address, latitude, longitude }) => (
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
        right={
          <>
            <StoresMap handleLoaded={() => setMapReady(true)} />
            {isMapReady &&
              dummyStores.map((store: Store) => {
                return (
                  <Marker
                    key={store.address}
                    map={mapRef.current?.getMap()}
                    latitude={store.latitude}
                    longitude={store.longitude}
                    isActive={activeStore?.address === store.address}
                    handleClick={() => handleMarkerClick(store)}
                  />
                );
              })}
            {isMapReady && activeStore && (
              <MapPopup
                map={mapRef.current?.getMap()}
                activeStore={activeStore}
              />
            )}
          </>
        }
      />
    </MapContext.Provider>
  );
}
