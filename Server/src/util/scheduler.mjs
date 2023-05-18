import { schedule } from "node-cron";
import fs from "fs-extra";
import path from "path";

function directoryDelete(directoryPath) {
  console.log("absolute path", directoryPath);
  console.log("absolute path", directoryPath);
  console.log("absolute path", directoryPath);
  fs.pathExists(directoryPath, (err, exists) => {
    if (err) {
      console.error(`Error accessing directory ${directoryPath}: ${err}`);
    } else if (!exists) {
      console.error(`Directory ${directoryPath} does not exist.`);
    } else {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          console.error(`Error reading directory ${directoryPath}: ${err}`);
        } else {
          let allFilesUnlocked = true;
          files.forEach((file) => {
            const filePath = `${directoryPath}/${file}`;
            try {
              fs.accessSync(filePath, fs.constants.F_OK | fs.constants.W_OK);
            } catch (err) {
              console.error(`File ${filePath} is being accessed by someone.`);
              allFilesUnlocked = false;
            }
          });
          if (allFilesUnlocked) {
            fs.remove(directoryPath, (err) => {
              if (err) {
                console.error(`Error deleting directory ${directoryPath}: ${err}`);
              } else {
                console.log(`Directory ${directoryPath} deleted successfully.`);
              }
            });
          } else {
            console.error(`Cannot delete directory ${directoryPath} because some files are being accessed.`);
          }
        }
      });
    }
  });
}

export const dailyScheduleTwo = schedule(
  "* * 5 * * *",
  () => {
    console.log("running a task every minute");
    const currentDir = process.cwd();
    const absolutePath = path.join(currentDir, "tmp");

    console.log(absolutePath);
    directoryDelete(absolutePath);
  },
  {
    scheduled: false,
  }
);
