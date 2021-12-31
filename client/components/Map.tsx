import Head from "next/head";
import { FC, useEffect, useState } from "react";
import {
  MapContainer,
} from "react-leaflet";
import MapContent from "./MapContent";
import { Item } from "./types";

const getCoords = async () => {
  const result = await fetch("/api/coords");
  const json: { data: Item[] } = await result.json();
  //   console.log(json);
  return json.data;
};

const Map: FC = () => {
  const [coords, setCoords] = useState<Item[]>([]);

  const update = async () => {
    const result = await getCoords();
    if(result.length > 0) {
      setCoords(result);
    }
  }

  useEffect(() => {
    update();
  }, []);

  return (
    <div>
      <Head>
        <title>DataLora Map</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛰️</text></svg>"
        />
      </Head>
      <MapContainer
        // center={DEFAULT_CENTER}
        zoom={20}
        //   scrollWheelZoom={false}
      >
        <MapContent coords={coords} />
      </MapContainer>
      <div className="custom-controls">
        <button onClick={update}>update</button>
        <button>all</button>
      </div>
    </div>
  );
};

export default Map;
