import drive from "./driveAuth";

const GOOGLE_DRIVE_FOLDER_ID = "1R3ohARnSkynrdE26TjevUjWACFg9QRcw";

export default async function getAllFolders() {
  try {
    const listOfDrivefiles = await drive.files.list({
      q: `'${GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType contains 'application/vnd.google-apps.folder'`,
    });

    const files = listOfDrivefiles.data.files;

    if (files?.length === 0) {
      console.log("No files found.");
      return;
    }

    return files;
  } catch (error: any) {
    console.log(error);
  }
}
