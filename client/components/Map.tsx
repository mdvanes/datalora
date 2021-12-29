import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const getCoords = async () => {
  const result = await fetch("/api/coords");
  const json = await result.json();
  //   console.log(json);
  //   setCoords(json);
  return json.data;
};

const Map: FC = () => {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    getCoords().then((x) => setCoords(x));
  }, []);

  return (
    <div>
      <MapContainer
        center={[52.062763, 4.495023]}
        zoom={20}
        //   scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[52.062763, 4.495023]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {coords.map((coord: any, index) => {
          //   console.log(coord);
          return (
            <Marker
              key={`${coord.lat}-${coord.lon}-${index}`}
              position={[coord.lat, coord.lon]}
            ></Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
