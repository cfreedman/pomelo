import React, {
  JSX,
  useRef,
  createContext,
  RefObject,
  useState,
  useEffect,
} from "react";

import TwoColumn from "@/components/layout/TwoColumn";
import { MapRef } from "react-map-gl/mapbox";
import StoresMap from "@/components/StoresMap";
import Marker from "@/components/Marker";
import MapPopup from "@/components/MapPopup";
import { Store, StoreCreate } from "@/lib/stores";
import { useStores } from "@/hooks/useStores";

export const MapContext = createContext<RefObject<MapRef | null>>({
  current: null,
});

export default function StoresPage(): JSX.Element {
  const mapRef = useRef<MapRef>(null);
  const [isMapReady, setMapReady] = useState(false);
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [searchStore, setSearchStore] = useState<StoreCreate | null>(null);

  const { stores } = useStores();

  useEffect(() => {
    if (!activeStore && !searchStore) {
      return;
    }

    const latitude = activeStore?.latitude ?? searchStore?.latitude;
    const longitude = activeStore?.longitude ?? searchStore?.longitude;
    if (latitude === undefined || longitude === undefined) {
      return;
    }
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 14,
    });
  }, [activeStore, searchStore]);

  const handleMarkerClick = (store: Store) => {
    setActiveStore(store);
    setSearchStore(null);
  };

  const handleStoreSearch = (store: StoreCreate) => {
    setActiveStore(null);
    setSearchStore(store);
  };

  return (
    <MapContext.Provider value={mapRef}>
      <TwoColumn
        left={
          <>
            <h1>Favorite Stores</h1>
            <ul>
              {stores.map((store) => (
                <StoreItem
                  key={store.id}
                  store={store}
                  active={activeStore?.address === store.address}
                  handleStoreClick={() => setActiveStore(store)}
                />
              ))}
            </ul>
          </>
        }
        right={
          <>
            <StoresMap
              handleLoaded={() => setMapReady(true)}
              handleStoreSearch={handleStoreSearch}
            />
            {isMapReady &&
              stores.map((store: Store) => {
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
            {searchStore && (
              <Marker
                key={searchStore.address}
                map={mapRef.current?.getMap()}
                latitude={searchStore.latitude}
                longitude={searchStore.longitude}
                isActive={false}
                handleClick={() => {
                  console.log("blah");
                }}
              />
            )}
            {isMapReady && (activeStore || searchStore) && (
              <MapPopup
                map={mapRef.current?.getMap()}
                currentStore={
                  (activeStore ?? searchStore) as Store | StoreCreate
                }
                saveable={searchStore !== null && activeStore === null}
              />
            )}
          </>
        }
      />
    </MapContext.Provider>
  );
}

interface StoreItemProps {
  store: Store;
  active: boolean;
  handleStoreClick: () => void;
}

const StoreItem = ({ store, active, handleStoreClick }: StoreItemProps) => {
  console.log(store.ingredients);
  const foodTypeFrequencies = store.ingredients?.reduce((map, ingredient) => {
    if (ingredient.foodType) {
      map[ingredient.foodType] = (map[ingredient.foodType] || 0) + 1;
    }
    return map;
  }, {} as Record<string, number>);

  const sortedFrequencies = foodTypeFrequencies
    ? Object.entries(foodTypeFrequencies).sort((a, b) => b[1] - a[1])
    : [];

  const topThreeFoodTypes = sortedFrequencies
    .slice(0, 3)
    .map(([foodType]) => foodType);

  return (
    <li
      className={`${
        active ? "bg-breaker-bay-400" : "bg-breaker-bay-50"
      } hover:bg-breaker-bay-200 rounded-lg p-4 mb-2`}
    >
      <button onClick={() => handleStoreClick()}>
        <div className="flex">
          <div className="flex flex-col items-start">
            <h3>{store.name}</h3>
            <p>{store.address}</p>
          </div>
          <ul>
            {store.ingredients?.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))}
          </ul>
          {topThreeFoodTypes.map((foodType) => (
            <p key={foodType}>{foodType}</p>
          ))}
        </div>
      </button>
    </li>
  );
};
