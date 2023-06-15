import renameFolder from "./renameFolder";
import getAllImages from "./listDriveFolders";

export default async function updateFolder(
  folderName: string,
  newFolderName: string
) {
  const files = await getAllImages();

  const folderToUpdate = files?.find(
    (folderInformation) => folderInformation.name === folderName
  );

  if (folderToUpdate) {
    await renameFolder(folderToUpdate.id as string, newFolderName);
  }

  return console.log("nenhuma pasta encontrada");
}
