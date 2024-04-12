import { PrismaClient } from "@prisma/client";

import IAdministrator from "../interfaces/administratorInterface";

const prisma = new PrismaClient();

export default class administradorService {
  public async createAdministrator(admData: IAdministrator) {
    const newAdm = await prisma.administrador.create({
      data: admData,
    });

    return newAdm;
  }
}
