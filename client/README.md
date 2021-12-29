# Running

- `yarn`
- `yarn start`
- curl:

```bash
curl -X POST http://localhost:3031/api/lora \
   -H 'Content-Type: application/json' -H 'Origin: http://example.com' \
   -d '[     { "bn": "urn:dev:DVNUUID:???:", "bt": 111111111111     },     { "n": "battery", "u": "%", "vs": "85.0"     },     { "n": "accelerationX", "u": "m/s2", "v": 0     },     { "n": "latitude", "u": "lat", "v": 1.10000     },     { "n": "longitude", "u": "lon", "v": 2.10000     },     { "n": "locTime", "vs": "1"     } ]'
```

- Start MQTT server: 
```bash
docker run --rm -d -it -p 1883:1883 -p 9001:9001 \
    --name loradatamosquitto \
    -v $(pwd)/mosquitto.conf:/mosquitto/config/mosquitto.conf \
    -v $(pwd)/mosquitto-data:/mosquitto/data \
    eclipse-mosquitto
```
- test (terminal 1): yarn mqtt sub -t 'hello' -h 'test.mosquitto.org' -v
- test (terminal 2): yarn mqtt pub -t 'hello' -h 'test.mosquitto.org' -m 'from MQTT.js'
- test (terminal 1): yarn mqtt sub -t 'hello' -h '192.168.0.17' -v
- test (terminal 2): yarn mqtt pub -t 'hello' -h '192.168.0.17' -m 'from MQTT.js'



- OLD --- Start MQTT server: 
```bash
docker run --rm -d -it -p 1883:1883 -p 9001:9001 \
    --name loradatamosquitto \
    -v $(pwd)/mosquitto/:/moquitto/ \
    eclipse-mosquitto
```