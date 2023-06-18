import getAllFolders from "./listDriveFolders";

import drive from "./driveAuth";

async function renameFolder(folderId: string, newName: string) {
  try {
    const response = await drive.files.update({
      fileId: folderId,
      requestBody: {
        name: newName,
      },
    });

    console.log(
      "Pasta renomeada com sucesso, novo nome da pasta:" + response.data.name
    );
  } catch (error: any) {
    console.log("Erro ao renomear pasta:" + error.message);
  }
}

export default async function updateFolder(
  folderName: string,
  newFolderName: string
) {
  const files = await getAllFolders();

  const folderToUpdate = files?.find(
    (folderInformation) => folderInformation.name === folderName
  );

  if (folderToUpdate) {
    return await renameFolder(folderToUpdate.id as string, newFolderName);
  }

  return console.log("nenhuma pasta encontrada");
}
