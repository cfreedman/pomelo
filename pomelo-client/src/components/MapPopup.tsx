import { JSX, useEffect, useRef } from "react";

import { MapInstance } from "react-map-gl/mapbox";

import { Store } from "@/lib/stores";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

interface MapPopupProps {
  map: MapInstance | undefined;
  activeStore: Store;
}

export default function MapPopup({
  map,
  activeStore,
}: MapPopupProps): JSX.Element {
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

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
      .setLngLat([activeStore.longitude, activeStore.latitude])
      .setDOMContent(contentRef.current)
      .addTo(map);
  }, [activeStore, map]);

  return createPortal(
    <div className="bg-white text-black p-3">
      <h3>{activeStore.name}</h3>
      <p>{activeStore.address}</p>
    </div>,
    contentRef.current
  );
}
