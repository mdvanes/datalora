import Head from "next/head";
import { FC, useEffect, useState } from "react";
import {
  MapContainer,
} from "react-leaflet";
import MapContent from "./MapContent";
import { Item } from "./types";

const UPDATE_INTERVAL = 1000 * 60 * 60; // 1000 ms / 60 seconds / 60 minutes = 1x per hour

const getCoords = async () => {
  const result = await fetch("/api/coords");
  const json: { data: Item[] } = await result.json();
  //   console.log(json);
  return json.data;
};

const Map: FC = () => {
  const [coords, setCoords] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryType, setQueryType] = useState<"24h" | "all">("24h");

  const update = async () => {
    setIsLoading(true);
    try {
      const result = await getCoords();
      if(result.length > 0) {
        setCoords(result);
      }  
    } catch(err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  const toggleQueryType = () => {
    setQueryType(queryType === "all" ? "24h" : "all");
  }

  useEffect(() => {
    update();
    // Auto-update
    const interval = setInterval(() => {
      update();
    }, UPDATE_INTERVAL);
    return () => clearInterval(interval);
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
        <button onClick={update} disabled={isLoading}>update</button>
        <button onClick={toggleQueryType} disabled={isLoading}>{queryType === "all" ? "24h" : "all"}</button>
      </div>
    </div>
  );
};

export default Map;
