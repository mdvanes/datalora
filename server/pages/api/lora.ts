// TODO this just works by navigating to localhost:3000/api/lora

import { IncomingMessage, ServerResponse } from "http";
import { NextResponse } from "next/server";

export default function handler(req: IncomingMessage, res: any) {
  console.log('1', req.body);
  if(req.method === "POST") {
    // TODO handle incoming message from kpnthings
    res.status(200).json({ status: "DONE" });
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
