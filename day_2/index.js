
import fs from "fs";
import Path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.stat);

const extensions = [];
function getFileExtensions(filePath) {
    const extType = Path.extname(filePath);
    extensions.push(extType);
  return extensions;
}
console.log(getFileExtensions( "index.docx"));

const checkFileType = (dir) => {
  try {
    readdir(dir, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }
      files.forEach((file) => 
        {
        const filePath = Path.join(dir, file);
        stat(filePath, (err, stats) => {
          if (err) {
            console.error("Error getting file stats:", err);
            return;
          }
          if (stats.isDirectory()) {
            checkFileType(filePath);
          } else {
            getFileExtensions(filePath);
          }
        });
        console.log(file)
      }); 
    });
  } catch(error) {
    console.error(error);
  }
};
checkFileType('/home/shasha/Downloads')
const createFolderWithExt = async () => {
  const newDir = extensions.map((extension) => {
    const dirName = extension ? extension.slice(1) : "others";
    mkdir(Path.join(dirName));
  });
  await Promise.all(newDir);
};
console.log(createFolderWithExt());
