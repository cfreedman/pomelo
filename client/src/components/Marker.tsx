import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import mapboxgl, { Marker as MapMarker } from "mapbox-gl";
import { MapInstance } from "react-map-gl/mapbox";

import PomeloSticker from "@/assets/icons/pomelo-sticker.png";

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

  return (
    <>
      {createPortal(
        <button
          className={`${
            isActive ? "scale-150" : "scale-100"
          } w-[50px] h-[50px] cursor-pointer`}
          onClick={() => handleClick()}
        >
          <img src={PomeloSticker} alt="Pomelo" className="w-full h-full" />
        </button>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
