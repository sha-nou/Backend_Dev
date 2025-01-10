import fs, { existsSync } from "fs";
import Path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.stat);

const extensions = {}

const checkFileType = async (dir) => {
  try {
    readdir(dir, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }
      files.forEach((file) => {
        createFolderWithExt;
        const filePath = Path.join(dir, file);
        stat(filePath, (err, stats) => {
          if (err) {
            console.error("Error getting file stats:", err);
            return;
          }
          createFolderWithExt;
          if (stats.isDirectory()) {
            checkFileType(filePath);
          } else {
            getFileExtensions(filePath);
          }
        });
        // console.log({file});
      });
    });

    // console.log({ extensions });
  } catch (error) {
    console.error(error);
  }
};
// checkFileType('/home/shasha/Downloads')
// const createFolderWithExt = async () => {
//   const newDir = extensions.map((extension) => {
//     const dirName = extension ? extension.slice(1) : "others";
//     mkdir(Path.join(dirName));
//   });
//   await Promise.all(newDir);
// };
// console.log(createFolderWithExt());

async function getFileExtensions(filePath) {
  const extType = Path.extname(filePath);
  if (extType) {
    extensions.add(extType);
  } else {
    extensions.add("others");
  }
}

async function createFolderWithExt(baseDir) {
  try {
    console.log({ extensions });

    for (const extension of extensions) {
      const dirName = extension.startsWith(".")
        ? extension.slice(1)
        : extension;
      const folderPath = Path.join(baseDir, dirName);
      await mkdir(folderPath, { recursive: true });
    }
  } catch (error) {
    console.error("Error creating folders:", error);
  }
}

(async () => {
  const baseDir = "/home/shasha/Downloads";
  await checkFileType(baseDir);

  // console.log("Nothing was printed");

  await createFolderWithExt(baseDir);

  // console.log(extensions);

  console.log(
    "Folders created based on file extensions:",
    Array.from(extensions)
  );
})();
