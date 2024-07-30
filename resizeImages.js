const fs = require("fs");
const path = require("path");
const im = require("imagemagick");

const BASE_PATH = __dirname;

// Directory containing the images
const inputDir = `${BASE_PATH}/input/Frank/Skull__z30`;
const outputDir = `${BASE_PATH}/input/Frank-r/Skull__z30`;

// Ensure the output directory exists, creating intermediate directories if necessary
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Desired width and height
const width = 1000;
const height = 1000;

// Read all files from the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    return console.error("Unable to scan directory: " + err);
  }

  // Loop through each file in the directory
  files.forEach((file) => {
    // Get the full paths
    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, file);

    // Check if the file is an image (basic check)
    if (/\.(jpe?g|png|gif)$/i.test(file)) {
      // Resize the image
      im.resize(
        {
          srcPath: inputFile,
          dstPath: outputFile,
          width: width,
          height: height,
        },
        (err, stdout, stderr) => {
          if (err) {
            console.error(`Error resizing ${file}:`, err);
          } else {
            console.log(`Resized ${file} and saved to ${outputFile}`);
          }
        }
      );
    }
  });
});
