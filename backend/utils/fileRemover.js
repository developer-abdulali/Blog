// import fs from "fs";
// import path from "path";

// export const fileRemover = (filename) => {
//   fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
//     if (err && err.code == "ENOENT") {
//       // file doesn't exist
//       console.log(`File ${filename} doesn't exist, won't remove it.`);
//     } else if (err) {
//       console.log(err.message);
//       console.log(`Error occured while trying to remove file ${filename}`);
//     } else {
//       console.log(`removed ${filename}`);
//     }
//   });
// };

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fileRemover = (filename) => {
  const filePath = path.join(__dirname, "../uploads", filename);
  fs.unlink(filePath, function (err) {
    if (err && err.code == "ENOENT") {
      // file doesn't exist
      console.log(`File ${filename} doesn't exist, won't remove it.`);
    } else if (err) {
      console.log(
        `Error occurred while trying to remove file ${filename}: ${err.message}`
      );
    } else {
      console.log(`Removed ${filename}`);
    }
  });
};
