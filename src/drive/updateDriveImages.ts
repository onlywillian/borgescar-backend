import drive from "./driveAuth";
import getAllFolders from "./listDriveFolders";

import { PassThrough } from "stream";

export default async function updateDriveImages(carName: string) {
  const listOfFolders = await getAllFolders();

  const folderToUpdate = listOfFolders?.find(
    (folderInformation) => folderInformation.name === carName
  );

  const listOfDrivefiles = await drive.files.list({
    q: `'${folderToUpdate?.name}' in parents and mimeType contains 'image/'`,
  });

  listOfDrivefiles.data.files?.map(async (file) => {
    const bufferStream = new PassThrough();
    bufferStream.end(file);

    const updatedImage = await drive.files.update({
      fileId: file.id as string,
      media: {
        mimeType: file.mimeType as string,
        body: bufferStream,
      },
    });
  });
}
