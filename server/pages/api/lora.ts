// NOTE this just works by navigating to localhost:3000/api/lora

import { IncomingMessage, ServerResponse } from "http";
import { NextResponse } from "next/server";
import { appendFileSync, createWriteStream } from "fs";
import { InfluxDB, Point } from "@influxdata/influxdb-client";

// [
//   { bn: 'urn:dev:DEVEUI:111:', bt: 164 },
//   { n: 'locOrigin', vs: 'KPNLORA' },
//   { n: 'latitude', u: 'lat', v: 1 },
//   { n: 'longitude', u: 'lon', v: 1 },
//   { n: 'radius', u: 'm', v: 1 },
//   { n: 'locAccuracy', u: '%', v: 9999 },
//   { n: 'locPrecision', u: '%', v: 9999 },
//   { n: 'locTime', vs: '16407' }
// ]

// req.body [
//   {
//     bn: 'urn:dev:DEVEUI:???:',
//     bt: 164??,
//     n: 'temperature',
//     u: 'Cel',
//     v: 0
//   }
// ]
// 29-12-2021 12:45:02 , [ Invalid Date]

interface Line {
  n: string;
  v: number;
  vs: string;
}

// const stream = createWriteStream("log.txt", { flags: "a" });

const url = process.env.INFLUX_URL!;
const token = process.env.INFLUX_TOKEN!;
const org = process.env.INFLUX_ORG!;
const bucket = process.env.INFLUX_BUCKET!;

const influxDB = new InfluxDB({ url, token });
const writeApi = influxDB.getWriteApi(org, bucket);
writeApi.useDefaultTags({ region: "west" });

export default function handler(req: IncomingMessage, res: any) {
  if (req.method === "POST") {
    // @ts-expect-error req.body exists
    const data: Line[] = req.body;
    // console.log("req.body", data, req.headers, req.headers.origin);

    try {
      const temp = data.find((item) => item.n === "temperature")?.v ?? -1;
      if (temp === -1) {
        const latitude = data.find((item) => item.n === "latitude")?.v ?? "";
        const longitude = data.find((item) => item.n === "longitude")?.v ?? "";
        const locTime = data.find((item) => item.n === "locTime")?.vs ?? "";

        const logtimestamp = new Date().toLocaleString("nl-nl");
        const logMessage = `${logtimestamp} ${latitude},${longitude} [${locTime} ${new Date(
          parseInt(locTime, 10)
        ).toLocaleString("nl-nl")}]`;
        // console.log(logMessage);
        // stream.write(`${logMessage}\n`);

        const point1 = new Point("location")
          .tag("sensor_id", "towel")
          // TODO definitely the wrong way to store latitude and longitude
          .stringField("latlng", `[${latitude},${longitude}]`);
        console.log(
          `point1= ${point1} (time ${new Date(
            parseInt(locTime, 10)
          ).toLocaleString("nl-nl")})`
        );
        writeApi.writePoint(point1);
        // TODO close on server close?
        // writeApi.close().then(() => {
        //   console.log("WRITE FINISHED");
        // });
      } else {
        console.log("temp ignored");
      }
      res.status(200).json({ status: "POST OK" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "POST FAILED" });
    }
  } else {
    // @ts-expect-error req.query exists
    console.log("req.query", req.query);

    res.status(200).json({ status: "GET OK" });
  }
}
