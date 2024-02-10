module.exports = async function (context, myBlob) {
  context.log("It is executed. Blob name:", context.bindingData.name);
  context.log("Blob content:", myBlob.toString());
};