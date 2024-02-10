const azure = require("azure-storage");

module.exports = async function (context, outputSbQueueMsg) {
  const storageAccountConnection = "DefaultEndpointsProtocol=https;AccountName=sbqstorage;AccountKey=Doyesj+qZ3L/mOQBxKLnQsFfY9kK/e3WeM71Ms9ttpQQFtm5GV5By/TChIlaCum8586G0ietsU3j+AStY2JSXw==;EndpointSuffix=core.windows.net";
  const containerName = "lab3container";
  const blobName = `health-check-report-${Date.now()}.txt`;

  context.log("Received message from Service Bus Queue:", outputSbQueueMsg);

  // Convert the health check report into a text document
  const reportText = generateReportText(outputSbQueueMsg);

  // Upload the text document to Blob Storage
  const blobService = azure.createBlobService(storageAccountConnection);

  blobService.createBlockBlobFromText(
    containerName,
    blobName,
    reportText,
    (error, result, response) => {
      if (error) {
        context.log.error("Error happened during uploading report to Blob Storage:", error);
      } else {
        context.log("Report uploaded to Blob Storage successfully.", blobName);
      }
    }
  );
};

function generateReportText(healthCheckReport) {
  let reportText = "Here is Health Check Report:\n\n";

  healthCheckReport.reports.forEach((report, index) => {
    reportText += `URL ${index + 1}:\n`;
    reportText += `Status: ${report}\n\n`;
  });

  return reportText;
}