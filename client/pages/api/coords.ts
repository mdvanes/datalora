// NOTE this just works by navigating to localhost:3000/api/coords

import { IncomingMessage, ServerResponse } from "http";
import { NextResponse } from "next/server";
import { readFileSync } from "fs";

interface Item {
  loc: [number, number];
  time: string;
}

const parseLogLine = (line: string): Item | null => {
  // console.log(line);
  const [date, time, coordsStr] = line.split(" ");

  if (coordsStr) {
    const [latStr, lonStr] = coordsStr.split(",");
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);
    if(isNaN(lat) || isNaN(lon)) {
      return null;
    }
    try {
      const loc: [number, number] = [lat, lon];
      return {
        loc,
        time: `${date} ${time}`,
      };
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};

const isNotNull = <T>(item: T | null): item is T => {
  return item !== null;
};

export default function handler(req: IncomingMessage, res: any) {
  if (req.method === "POST") {
    res.status(200).json({ status: "POST OK" });
  } else {
    // const result = readFileSync("./log.txt", "utf8");
    const result = readFileSync("../server/log.txt", "utf8");
    // console.log(result);

    const lines = result.split("\n");
    const coords = lines.map<Item | null>(parseLogLine).filter(isNotNull);
    // console.log(coords);

    res.status(200).json({ status: "GET OK", data: coords });
  }
}
