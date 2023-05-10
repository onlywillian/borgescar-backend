import drive from "./driveAuth";
import fs from "fs";
import path from "path";

const GOOGLE_DRIVE_FOLDER_ID = "1R3ohARnSkynrdE26TjevUjWACFg9QRcw";

async function uploadNewImage() {
  // creating folder container
  const folderResponse = await drive.files.create(
    {
      requestBody: {
        name: "folder",
        parents: [GOOGLE_DRIVE_FOLDER_ID],
        mimeType: "application/vnd.google-apps.folder", // folder type
      },
      fields: "id",
    },
    async (err, folder) => {
      if (err) return console.log("Erro: " + err);

      const imagePath = path.resolve(process.cwd(), "src/drive/carro.jpg");

      // creating file into folder
      const file = await drive.files.create({
        requestBody: {
          name: "image.jpg",
          parents: [folder?.data.id as string],
          mimeType: "image/jpg",
        },
        media: {
          mimeType: "image/jpg",
          body: fs.createReadStream(imagePath),
        },
        fields: "id",
      });

      return file.data;
    }
  );
}

uploadNewImage();
