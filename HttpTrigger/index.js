const { http } = require('@azure/functions');
const df = require("durable-functions");

module.exports = async function (context) {
    try {
        const exampleUrls = ["https://www.algonquincollege.com", "https://hydroottawa.com"];
        context.log("Example URLs:", exampleUrls);

        const client = df.getClient(context);
        const instanceId = await client.startNew('DurableFanOutInTrigger', undefined, { urls: exampleUrls });

        context.res = {
            status: 202,
            body: "Orchestration started successfully with example URLs."
        };

        return client.createCheckStatusResponse(instanceId);
    } catch (error) {
        context.log.error(`Error handling request: ${error}`);
        context.res = {
            status: 500,
            body: "Internal server error"
        };
    }
};