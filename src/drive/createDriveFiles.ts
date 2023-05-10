import drive from "./driveAuth";
import fs from "fs";

async function uploadNewImage() {
  try {
    drive.files.create(
      {
        requestBody: {
          name: "Nome da pasta",
          mimeType: "application/vnd.google-apps.folder",
        },
        fields: "id",
      },
      (err: any, folder: any) => {
        if (err) return console.log(`Erro ao criar pasta: ${err}`);

        // Caminho do arquivo de imagem a ser enviado
        const filePath = "caminho/para/a/imagem.jpg";

        // Lê o conteúdo da imagem em um buffer
        const fileContent = fs.readFileSync(filePath);

        // Cria um objeto para fazer upload do arquivo
        const fileMetadata = {
          name: "Nome da imagem",
          parents: [folder?.data.id as string],
        };

        const media = {
          mimeType: "image/jpeg",
          body: fs.createReadStream(filePath),
        };

        // Faz upload da imagem para o Google Drive
        drive.files.create(
          {
            requestBody: fileMetadata,
            media: media,
            fields: "id",
          },
          (err: any, file: any) => {
            if (err)
              return console.log(`Erro ao fazer upload de imagem: ${err}`);

            console.log(`Imagem enviada com sucesso! ID: ${file.data.id}`);
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
}
