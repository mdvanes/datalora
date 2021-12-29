# Running

- yarn
- yarn start
- curl:

```bash
curl -X POST http://localhost:3031/api/lora \
   -H 'Content-Type: application/json' \
   -d '[     { "bn": "urn:dev:DVNUUID:???:", "bt": 111111111111     },     { "n": "battery", "u": "%", "vs": "85.0"     },     { "n": "accelerationX", "u": "m/s2", "v": 0     },     { "n": "latitude", "u": "lat", "v": 1.10000     },     { "n": "longitude", "u": "lon", "v": 2.10000     } ]'
```
