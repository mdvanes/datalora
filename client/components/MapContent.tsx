import { LatLngTuple, polygon } from "leaflet";
import { FC, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

interface Item {
  loc: LatLngTuple;
  time: string;
}

const getCoords = async () => {
  const result = await fetch("/api/coords");
  const json: { data: Item[] } = await result.json();
  //   console.log(json);
  //   setCoords(json);
  return json.data;
};

const DEFAULT_CENTER: LatLngTuple = [52, 5.1];

const TILES_LAYER_DEFAULT =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILES_LAYER_BW = "https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png";
// Source: https://leaflet-extras.github.io/leaflet-providers/preview/
const TILES_LAYER_DARK =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const MapContent: FC = () => {
  const [coords, setCoords] = useState<Item[]>([]);
  //   const [center, setCenter] = useState<LatLngTuple>(DEFAULT_CENTER);
  const [marker, setMarker] = useState<Item | null>(null);
  const map = useMap();

  useEffect(() => {
    getCoords().then((result) => {
      //   result.push({ loc: [51, 1], time: "" }); // for debugging fitBounds
      setCoords(result);
      if (result.length > 0) {
        // console.log(result[0].loc);
        // map.setView(DEFAULT_CENTER, 15);
        // map.flyTo(result[0].loc, 20);
        // map.setView(result[0].loc, 20);
        const newPoly = polygon(result.map(({ loc }) => loc));
        map.fitBounds(newPoly.getBounds());
        const last = result[result.length - 1];
        setMarker(last);
      }
    });
  }, []);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={TILES_LAYER_DARK}
      />
      <Polyline positions={coords.map((coord) => coord.loc)} />
      {marker && (
        <Marker position={marker.loc}>
          <Popup>
            {marker.time}
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default MapContent;
