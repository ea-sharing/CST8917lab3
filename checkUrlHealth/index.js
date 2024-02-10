const axios = require("axios");

module.exports.checkUrlHealth = async function (context, url) {
    try {
        const response = await axios.get(url);
        context.log(`${url} is healthy`);
        return `${url} is healthy`;
    } catch (error) {
        context.log(`${url} is not healthy: ${error.message}`);
        return `${url} is not healthy: ${error.message}`;
    }
};
