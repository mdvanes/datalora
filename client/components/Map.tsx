import { FC, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

interface Item {
  loc: [number, number];
  time: string;
}

const getCoords = async () => {
  const result = await fetch("/api/coords");
  const json: { data: Item[] } = await result.json();
  //   console.log(json);
  //   setCoords(json);
  return json.data;
};

const Map: FC = () => {
  const [coords, setCoords] = useState<Item[]>([]);
  const [center, setCenter] = useState<[number, number]>([52, 5.1]);

  useEffect(() => {
    getCoords().then((result) => {
      setCoords(result);
      //   if (result.length > 0) {
      //     setCenter(result[0].loc);
      //     console.log(result[0].loc);
      //   }
    });
  }, []);

  useEffect(() => {
    if (coords.length > 0) {
      setCenter(coords[0].loc);
      console.log(coords[0].loc);
    }
  }, [coords]);

  return (
    <div>
      <MapContainer
        center={center}
        zoom={20}
        //   scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[1, 1]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {/* {coords.map((coord, index) => {
          //   console.log(coord);
          return (
            <Marker
              key={coord.time}
              position={coord.loc}
            ></Marker>
          );
        })} */}
        <Polyline positions={coords.map((coord) => coord.loc)} />
      </MapContainer>
    </div>
  );
};

export default Map;
