

const checkFileType = async (dir) => {
  try {
    const files = await readdir(dir);
    for (const file of files) {
      const filePath = Path.join(dir, file);
      const stats = await stat(filePath);
      if (stats.isDirectory()) {
        await checkFileType(filePath); // Recursive call
      } else {
        getFileExtension(filePath);
      }
    }
    await createFolderWithExt();
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};



// Example usage
(async () => {
  await checkFileType("./"); // Adjust the path as needed
  console.log("Extensions:", extensions);
})();
