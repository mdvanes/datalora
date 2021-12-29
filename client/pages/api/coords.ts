// TODO this just works by navigating to localhost:3000/api/lora

import { IncomingMessage, ServerResponse } from "http";
import { NextResponse } from "next/server";
import { readFileSync } from "fs";

// interface Line {
//   n: string;
//   v: number;
//   vs: string;
// }

export default function handler(req: IncomingMessage, res: any) {
  if (req.method === "POST") {
    res.status(200).json({ status: "POST OK" });
  } else {
    // @ts-expect-error req.query exists
    console.log("req.query", req.query);

    // const result = readFileSync("./log.txt", "utf8");
    const result = readFileSync("../server/log.txt", "utf8");
    // console.log(result);

    const lines = result.split("\n");
    const coords = lines.map((line) => {
      const [, , coordsStr] = line.split(" ");

      if(coordsStr) {
        const [lat, lon] = coordsStr.split(",");
        return {
          lat,
          lon,
        };
      } else {
        return {
          lat: 0,
          lon: 0,
        }
      }
    });
    console.log(coords);

    res.status(200).json({ status: "GET OK", data: coords });
  }
}
