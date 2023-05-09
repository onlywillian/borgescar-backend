import drive from "./driveAuth";

const GOOGLE_DRIVE_FOLDER_ID = "1R3ohARnSkynrdE26TjevUjWACFg9QRcw";

let imagesList;

async function getAllImages() {
  try {
    const response = await drive.files.list({
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

getAllImages().then((files) => {
  console.log(files);

  imagesList = files;
});

export default imagesList;
