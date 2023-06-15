import drive from "./driveAuth";

async function renameFolder(folderId: string, newName: string) {
  try {
    const response = await drive.files.update({
      fileId: folderId,
      requestBody: {
        name: newName,
      },
    });

    console.log("Pasta renomeada com sucesso.");
    console.log("Novo nome da pasta:", response.data.name);
  } catch (error: any) {
    console.log("Erro ao renomear pasta:", error.message);
  }
}

export default renameFolder;
