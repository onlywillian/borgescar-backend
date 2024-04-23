import { PrismaClient } from "@prisma/client";

import IAdministrator from "../interfaces/administratorInterface";
import APIError from "../errors/apiError";

const prisma = new PrismaClient();

export default class administradorService {
  public async getAdmById(id: string) {
    const adm = await prisma.administrador.findFirst({
      where: {
        id: id,
      },
    });

    if (!adm) throw new APIError("Error", "Error in adm creation", 500);

    return adm;
  }

  public async createAdministrator(admData: IAdministrator) {
    const newAdm = await prisma.administrador.create({
      data: admData,
    });

    return newAdm;
  }
}
