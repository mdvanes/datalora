import { LatLngTuple } from "leaflet";
import Head from "next/head";
import { FC } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import MapContent from "./MapContent";

const Map: FC = () => {
  return (
    <div>
      <Head>
        <title>DataLora Map</title>
      </Head>
      <MapContainer
        // center={DEFAULT_CENTER}
        zoom={20}
        //   scrollWheelZoom={false}
      >
        <MapContent />
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
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
        {/* <Polyline positions={coords.map((coord) => coord.loc)} /> */}
      </MapContainer>
    </div>
  );
};

export default Map;
