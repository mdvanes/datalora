# DataLoRa

> Azure function to be used as KPN Things LoRa destination to receive LoRa data from a Marvin device or simulator
> Play on words of [Datalore](https://en.wikipedia.org/wiki/Datalore) and LoRa

My car's app removed the feature to display the car's current location, so I built my own GPS tracker with [Marvin](https://www.rdmmakerspace.nl/marvin/), [KPN Things](https://portal.kpnthings.com/), [InfluxDB](https://docs.influxdata.com/influxdb/v2.1/) and [NextJS](https://nextjs.org/).

## Overview

Diagram

![diagram](/DataLoRa.drawio.svg)

## Running

- run /server (see server/README.md)

## Publishing

- Configure envars in docker-compose.yml
- Run `docker-compose up`
- It might be that there was no configuration for InfluxDB, either log in at localhost:8086 to set it up, or copy an existing configuration to the influx directory.

## Resources

- https://portal.kpnthings.com/ (Freemium)
- https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-typescript
