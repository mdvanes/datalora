import { LatLngTuple } from "leaflet";
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

const MapContent: FC = () => {
  const [coords, setCoords] = useState<Item[]>([]);
  //   const [center, setCenter] = useState<LatLngTuple>(DEFAULT_CENTER);
  const map = useMap();

  useEffect(() => {
    getCoords().then((result) => {
      setCoords(result);
      //   if (result.length > 0) {
      //     setCenter(result[0].loc);
      console.log(result[0].loc);
      //   }
      //   map.setView(center, 20);
      map.setView(result[0].loc);
    });
  }, []);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
      />
      <Polyline positions={coords.map((coord) => coord.loc)} />
    </>
  );
};

export default MapContent;
