import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import mapboxgl, { Marker as MapMarker } from "mapbox-gl";
import { MapInstance } from "react-map-gl/mapbox";

interface MapMarkerProps {
  map: MapInstance | undefined;
  latitude: number;
  longitude: number;
  isActive: boolean;
  handleClick: () => void;
}

const Marker: React.FC<MapMarkerProps> = ({
  map,
  latitude,
  longitude,
  isActive,
  handleClick,
}) => {
  const markerRef = useRef<MapMarker | null>(null);
  const contentRef = useRef(document.createElement("div"));

  useEffect(() => {
    if (!map) {
      return;
    }

    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerRef.current?.remove();
    };
  }, [map, latitude, longitude]);

  const style = isActive ? "bg-red" : "bg-blue";

  return (
    <>
      {createPortal(
        <div
          className={style}
          style={{
            display: "inline-block",

            padding: "2px 10px",

            borderRadius: "50px",

            backgroundColor: isActive ? "#333" : "#fff",

            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",

            fontFamily: "Arial, sans-serif",

            fontSize: "14px",

            fontWeight: "bold",

            color: isActive ? "#fff" : "#333",

            textAlign: "center",
          }}
          onClick={() => handleClick()}
        >
          {latitude}
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
