import drive from "./driveAuth";
import fs from "fs";
import path from "path";
import { PassThrough } from "stream";

const GOOGLE_DRIVE_FOLDER_ID = "1R3ohARnSkynrdE26TjevUjWACFg9QRcw";

async function uploadNewImage(
  folderName: string,
  fileName: string,
  fileMimeType: string,
  fileBuffer: Buffer
) {
  // creating folder container
  await drive.files.create(
    {
      requestBody: {
        name: folderName,
        parents: [GOOGLE_DRIVE_FOLDER_ID],
        mimeType: "application/vnd.google-apps.folder", // folder type
      },
      fields: "id",
    },
    async (err, folder) => {
      if (err) return console.log("Erro: " + err);

      const bufferStream = new PassThrough();
      bufferStream.end(fileBuffer);

      // creating file into folder
      const file = await drive.files.create({
        requestBody: {
          name: fileName,
          parents: [folder?.data.id as string],
          mimeType: fileMimeType,
        },
        media: {
          mimeType: fileMimeType,
          body: bufferStream,
        },
        fields: "id",
      });

      console.log(file);

      return file.data;
    }
  );
}

export default uploadNewImage;
