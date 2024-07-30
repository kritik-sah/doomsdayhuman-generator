const fs = require("fs");
const path = require("path");
const renderdata = require("./cache/_renderers.json");

const BASE_PATH = __dirname;

function exportOutput() {
  let mergedData = [];
  Object.entries(renderdata).forEach((item) => {
    const newJson = {};
    newJson.tokenID = item[0];
    newJson.name = item[1][0].data.name;
    newJson.description = item[1][0].data.description;
    newJson.file_name = `${item[0]}.png`;
    newJson.external_url = `https://raw.githubusercontent.com/kritik-sah/doomsdayhuman-generator/main/output/images/${item[0]}.png`;
    Object.entries(item[1][0].data.attributes).forEach((attribute) => {
      newJson[`attributes[${attribute[0]}]`] = attribute[1][0];
    });

    mergedData = mergedData.concat(newJson);
  });
  fs.writeFile(
    `${BASE_PATH}/metadata.json`,
    JSON.stringify(mergedData, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error(`Error writing merged JSON to file: ${err}`);
      } else {
        console.log(
          `Successfully merged JSON files into ${`${BASE_PATH}/all.json`}`
        );
      }
    }
  );
}
exportOutput();
