const axios = require('axios');
module.exports = async function (context, myTimer) {
    const httpTriggerUrl = "https://cst8917lab3asga0006.azurewebsites.net/api/HttpTrigger"; 
    try {
        await axios.post(httpTriggerUrl);
        context.log(`HTTP request sent successfully to ${httpTriggerUrl}`);
    } catch (error) {
        context.log(`Error sending HTTP request: ${error}`);
    }
    context.log('Timer function ran on time!');
};