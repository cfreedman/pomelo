import { JSX, useEffect, useRef } from "react";

import { MapInstance } from "react-map-gl/mapbox";

import { addStore, Store, StoreCreate } from "@/lib/stores";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";
import { useMutation } from "@tanstack/react-query";

interface MapPopupProps {
  map: MapInstance | undefined;
  currentStore: Store | StoreCreate;
}

export default function MapPopup({
  map,
  currentStore,
}: MapPopupProps): JSX.Element {
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const mutation = useMutation({
    mutationFn: () => addStore(currentStore),
  });

  if (!contentRef.current) {
    contentRef.current = document.createElement("div");
  }

  useEffect(() => {
    if (!map) return;

    popupRef.current = new mapboxgl.Popup({
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
    <div className="bg-white text-black p-3">
      <h3>{currentStore.name}</h3>
      <p>{currentStore.address}</p>
      <button onClick={() => mutation.mutate()}>Save Store</button>
    </div>,
    contentRef.current
  );
}
