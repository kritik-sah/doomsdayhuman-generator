const fs = require("fs");
const path = require("path");

const BASE_PATH = __dirname;
// Function to read JSON files from a given directory and merge them into one
function mergeJsonFiles() {
  fs.readdir(`${BASE_PATH}/output/erc721 metadata`, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    let mergedData = [];

    files.forEach((file) => {
      const filePath = path.join(`${BASE_PATH}/output/erc721 metadata`, file);

      if (path.extname(filePath) === ".json") {
        const fileData = fs.readFileSync(filePath, "utf8");
        try {
          const jsonData = JSON.parse(fileData);
          const newJson = {};
          newJson.tokenID = jsonData.uid;
          newJson.name = jsonData.name;
          newJson.description = jsonData.description;
          newJson.file_name = `${jsonData.dna}.png`;
          newJson.external_url = `https://raw.githubusercontent.com/kritik-sah/doomsdayhuman-generator/main/output/images/${jsonData.dna}.png`;
          jsonData.attributes.forEach((attribute) => {
            newJson[`attributes[${attribute.trait_type}]`] = attribute.value;
          });

          mergedData = mergedData.concat(newJson);
        } catch (jsonErr) {
          console.error(`Error parsing JSON from file ${filePath}: ${jsonErr}`);
        }
      }
    });

    fs.writeFile(
      `${BASE_PATH}/all.json`,
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
  });
}

// Example usage: Pass the folder path and output file path as arguments
const folderPath = process.argv[2] || `${BASE_PATH}/output/erc721 metadata`;
const outputFilePath = process.argv[3] || `${BASE_PATH}/all.json`;

if (!folderPath || !outputFilePath) {
  console.error(
    "Please provide the folder path and output file path as arguments."
  );
  process.exit(1);
}

mergeJsonFiles(folderPath, outputFilePath);
