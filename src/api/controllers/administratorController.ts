import { Request, Response } from "express";

import administradorService from "../../services/administratorService";
import IAdministrator from "../../interfaces/administratorInterface";

export default class administratorController {
  private req: Request;
  private res: Response;
  private admService: administradorService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.admService = new administradorService();
  }

  public async getAdmById() {
    try {
      const { id } = this.req.params;

      const adm = await this.admService.getAdmById(id);

      return this.res.status(200).send({ adm });
    } catch (err: any) {}
  }

  public async createAdm() {
    try {
      const admData: IAdministrator = { ...this.req.body };

      const adm = await this.admService.createAdministrator(admData);

      return this.res.status(200).send({ adm });
    } catch (err: any) {}
  }
}
