// NOTE this just works by navigating to localhost:3000/api/coords

import { IncomingMessage } from "http";
import {
  FluxTableMetaData,
  InfluxDB,
} from "@influxdata/influxdb-client";
import { QueryType } from "components/types";

interface Item {
  loc: [number, number];
  time: string;
}

const url = process.env.INFLUX_URL!;
const token = process.env.INFLUX_TOKEN!;
const org = process.env.INFLUX_ORG!;

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

const createFluxQuery = (queryType: QueryType): string =>
  `from(bucket:"iot") 
  |> range(start: ${queryType === "24h" ? "-24h" : "0"}) 
  |> filter(fn: (r) => r._measurement == "location")`;

const rowMapper = (
  row: string[],
  tableMeta: FluxTableMetaData
): Item | null => {
  const o = tableMeta.toObject(row);
  // console.log(row);
  // console.log(
  //   `${o._time} ${o._measurement} in ${o.region} (${o.sensor_id}): ${o._field}=${o._value}`
  // );
  if (typeof o._value === "string") {
    // console.log(o._value);
    const [latStr, lonStr] = o._value.slice(1, o._value.length - 1).split(",");
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);
    if (!isNaN(lat) && !isNaN(lon)) {
      const loc: [number, number] = [lat, lon];
      return { loc, time: o._time };
    }
  }
  return null;
};

const isNotNull = <T>(item: T | null): item is T => {
  return item !== null;
};

const getQueryType = (req: IncomingMessage): QueryType => {
  // @ts-expect-error req.query exists
  const t: string = req.query?.type ?? "24h";
  const isValid = t === "all" || t === "24h";
  return isValid ? t : "24h";
};

export default async function handler(req: IncomingMessage, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ status: "ONLY GET IS ALLOWED" });
  } else {
    const queryType: QueryType = getQueryType(req);
    const rows = await queryApi.collectRows(
      createFluxQuery(queryType),
      rowMapper
    );
    const coords = rows.filter(isNotNull);
    // console.log("rows", coords);

    res.status(200).json({ status: "GET OK", data: coords });
  }
}
