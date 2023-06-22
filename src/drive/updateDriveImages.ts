import drive from "./driveAuth";
import getAllFolders from "./listDriveFolders";

import { PassThrough } from "stream";

export default async function updateDriveImages(
  carName: string,
  imageBuffers: any
) {
  const listOfFolders = await getAllFolders();

  const folderToUpdate = listOfFolders?.find(
    (folderInformation) => folderInformation.name === carName
  );

  try {
    const res = await drive.files.list({
      q: `'${folderToUpdate!.id}' in parents and mimeType contains 'image/'`,
      fields: "files(id, mimeType)",
    });

    const images = res.data.files;

    for (let index = 0; index < images!.length; index++) {
      const image = images![index];
      const bufferStream = new PassThrough();
      bufferStream.end(imageBuffers[index].buffer);

      await drive.files.update({
        fileId: image.id as string,
        media: {
          mimeType: image.mimeType as string,
          body: bufferStream,
        },
      });
    }
  } catch (err) {
    console.error("Erro ao listar as imagens:", err);
  }
}
