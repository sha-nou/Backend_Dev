import fs from "fs";
import Path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.stat);

const extensions = [];
async function getFileExtensions(dir) {

  const files = await readdir(dir);

  const fileTypes = {};

  for (const file of files) {
    const filePath = Path.join(dir, file);
    const stats = await stat(filePath);

    if (stats.isFile()) {
      const extType = Path.extname(file).toLowerCase();
      if (!fileTypes[extType]) {
        fileTypes[extType] = [];
      }
      fileTypes[extType].push(filePath);
    }
  }

  return fileTypes;
}

const checkFileType = async (dir) => {
  const fileTypes = await getFileExtensions(dir);
  createFolderWithExt(fileTypes, dir);
};

checkFileType("/home/shasha/Downloads");

const createFolderWithExt = async (fileTypes, dir) => {
  for (const [extension, filePaths] of Object.entries(fileTypes)) {

    const newFolder = extension.split(".")[1];
    mkdir(Path.join(dir,newFolder))


    for (const file of filePaths) {
      const fileName = Path.basename(file);
      const newPath = Path.resolve(dir, `${newFolder}/${fileName}`);
      console.log(newPath);

      fs.rename(file, newPath, (err) => {});
    }
  }

};

