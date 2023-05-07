import driveService from "./driveAuth";

const GOOGLE_DRIVE_FOLDER_ID = "1R3ohARnSkynrdE26TjevUjWACFg9QRcw";

let imagesList;

async function getAllFiles() {
  try {
    const response = await driveService.files.list({
      q: `'${GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/'`,
    });

    const files = response.data.files;

    if (files?.length === 0) {
      console.log("No files found.");
      return;
    }

    return files;
  } catch (error) {
    console.log(error);
  }
}

getAllFiles().then((files) => {
  console.log(files);

  imagesList = files;
});

export default imagesList;
