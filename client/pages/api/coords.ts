// NOTE this just works by navigating to localhost:3000/api/coords

import { IncomingMessage, ServerResponse } from "http";
import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import {
  FluxResultObserver,
  FluxTableMetaData,
  InfluxDB,
  Point,
} from "@influxdata/influxdb-client";

interface Item {
  loc: [number, number];
  time: string;
}

const url = "http://localhost:8086"; // process.env.INFLUX_URL;
const token =
  "ZiDWhwF4uG_wZ2b_QhdKT-Jv_MUINv-ML5d_UTcxtL8ST4BXV9hquf7moTAFMSPzJVeFcjGZ_kyRI_pd7SzBNw=="; // process.env.INFLUX_TOKEN;
const org = "bank"; // process.env.INFLUX_ORG;

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

const fluxQuery =
  'from(bucket:"bonk") |> range(start: 0) |> filter(fn: (r) => r._measurement == "location")';

// const result: Item[] = [];

// const fluxObserver = (res: any): FluxResultObserver<string[]> => ({
//   next(row, tableMeta) {
//     const o = tableMeta.toObject(row);
//     // console.log(row);
//     // console.log(
//     //   `${o._time} ${o._measurement} in ${o.region} (${o.sensor_id}): ${o._field}=${o._value}`
//     // );
//     if (typeof o._value === "string") {
//       // console.log(o._value);
//       const [latStr, lonStr] = o._value
//         .slice(1, o._value.length - 1)
//         .split(",");
//       const lat = parseFloat(latStr);
//       const lon = parseFloat(lonStr);
//       if (!isNaN(lat) && !isNaN(lon)) {
//         const loc: [number, number] = [lat, lon];
//         // TODO this is horribly not reactive
//         result.push({ loc, time: o._time });
//       }
//     }
//   },
//   error(error) {
//     console.error(error);
//     console.log("\nFinished ERROR");
//   },
//   complete() {
//     console.log(result);
//     console.log("\nFinished SUCCESS");
//     res.status(200).json({ status: "GET OK", data: result });
//   },
// });

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
      // TODO this is horribly not reactive
      // result.push({ loc, time: o._time });
      return { loc, time: o._time };
    }
  }
  return null;
};

// const parseLogLine = (line: string): Item | null => {
//   // console.log(line);
//   const [date, time, coordsStr] = line.split(" ");

//   if (coordsStr) {
//     const [latStr, lonStr] = coordsStr.split(",");
//     const lat = parseFloat(latStr);
//     const lon = parseFloat(lonStr);
//     if (isNaN(lat) || isNaN(lon)) {
//       return null;
//     }
//     try {
//       const loc: [number, number] = [lat, lon];
//       return {
//         loc,
//         time: `${date} ${time}`,
//       };
//     } catch (err) {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };

const isNotNull = <T>(item: T | null): item is T => {
  return item !== null;
};

export default async function handler(req: IncomingMessage, res: any) {
  if (req.method === "POST") {
    res.status(200).json({ status: "POST OK" });
  } else {
    // const result = readFileSync("./log.txt", "utf8");
    const result = readFileSync("../server/log.txt", "utf8");
    // console.log(result);

    const lines = result.split("\n");
    // const coords = lines.map<Item | null>(parseLogLine).filter(isNotNull);
    // console.log(coords);

    // queryApi.queryRows(fluxQuery, fluxObserver(res));
    const rows = await queryApi.collectRows(fluxQuery, rowMapper);
    const coords = rows.filter(isNotNull);
    console.log("rows", coords);

    res.status(200).json({ status: "GET OK", data: coords });
  }
}
