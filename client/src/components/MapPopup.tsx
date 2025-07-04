import { JSX, useEffect, useRef } from "react";

import { MapInstance } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";

import { Store, StoreCreate } from "@/lib/stores";
import { createPortal } from "react-dom";
import { useStores } from "@/hooks/useStores";

interface MapPopupProps {
  map: MapInstance | undefined;
  currentStore: Store | StoreCreate;
  saveable: boolean;
}

export default function MapPopup({
  map,
  currentStore,
  saveable,
}: MapPopupProps): JSX.Element {
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { addStore } = useStores();

  if (!contentRef.current) {
    contentRef.current = document.createElement("div");
  }

  useEffect(() => {
    if (!map) return;

    popupRef.current = new mapboxgl.Popup({
      className: "mapboxgl-popup",
      closeOnClick: false,
      offset: 40,
    });

    return () => {
      popupRef.current?.remove();
    };
  }, [map]);

  useEffect(() => {
    if (!map || !popupRef.current || !contentRef.current) return;

    popupRef.current
      .setLngLat([currentStore.longitude, currentStore.latitude])
      .setDOMContent(contentRef.current)
      .addTo(map);
  }, [currentStore, map]);

  return createPortal(
    <div className="bg-white text-black">
      <h3 className="mb-2 text-lg font-bold text-breaker-bay-600">
        {currentStore.name}
      </h3>
      <p className="mb-2">{currentStore.address}</p>
      {saveable && (
        <button
          onClick={() => {
            console.log("Clicked");
            addStore(currentStore);
          }}
        >
          Save Store
        </button>
      )}
    </div>,
    contentRef.current
  );
}
