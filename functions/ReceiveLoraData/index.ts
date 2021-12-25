import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const data = req.body;
    const latitude = data.find(item => item.n === "latitude").v;
    const longitude = data.find(item => item.n === "longitude").v;
    const battery = data.find(item => item.n === "battery").vs;
    context.log(`${latitude},${longitude} [${battery}]`);
    const responseMessage = "OK";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;