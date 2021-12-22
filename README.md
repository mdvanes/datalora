# DataLoRa

> Azure function to be used as KPN Things LoRa destination to receive LoRa data from a Marvin device or simulator
> Play on words of [Datalore](https://en.wikipedia.org/wiki/Datalore) and LoRa

## Running

- install: `yarn`
- Start and stop debugger with F5 / ctrl-C
- Call the function: in Azure extension > Functions > "my function" > Right-click > Execute function now...

## Publishing

- Sign in: in Azure extension > Sign in to Azure
- in Azure extension > Deploy to Function App
- Test from Azure extension, or use curl:

```bash
curl -X POST https://codestardatalora.azurewebsites.net/api/ReceiveLoraData \
   -H 'Content-Type: application/json' \
   -d '{"name":"foo"}'
```

## Resources

- https://portal.kpnthings.com/ (Freemium)
- https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-typescript
