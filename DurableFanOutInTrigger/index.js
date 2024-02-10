const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const input = context.df.getInput();
    const urls = input.urls;
    
    // context.log("Example URLs:", urls);

    const tasks = urls.map(url => context.df.callActivity("checkUrlHealth", url));
    const reports = yield context.df.Task.all(tasks);

    const message = {
        reports: reports
    };

    //context.log("MYMESSAGE", message);

    context.bindings.outputSbQueueMsg = message;
    return message;
});

