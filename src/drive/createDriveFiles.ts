import drive from "./driveAuth";
import { PassThrough } from "stream";

const GOOGLE_DRIVE_FOLDER_ID = "1R3ohARnSkynrdE26TjevUjWACFg9QRcw";

interface fileTypes {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

async function uploadNewImage(folderName: string, files: Array<fileTypes>) {
  return new Promise<string[]>((resolve, reject) => {
    drive.files.create(
      {
        requestBody: {
          name: folderName,
          parents: [GOOGLE_DRIVE_FOLDER_ID],
          mimeType: "application/vnd.google-apps.folder", // folder type
        },
        fields: "id",
      },
      async (err, folder) => {
        if (err) {
          console.log("Erro: " + err);
          reject(err);
          return;
        }

        const imagesIds = await Promise.all(
          files.map(async (fileData) => {
            const bufferStream = new PassThrough();
            bufferStream.end(fileData.buffer);

            // creating file into folder
            const file: any = await drive.files.create({
              requestBody: {
                name: fileData.originalname,
                parents: [folder?.data.id as string],
                mimeType: fileData.mimetype,
              },
              media: {
                mimeType: fileData.mimetype,
                body: bufferStream,
              },
              fields: "id",
            });

            return file.data.id;
          })
        );

        resolve(imagesIds);
      }
    );
  });
}

export default uploadNewImage;
