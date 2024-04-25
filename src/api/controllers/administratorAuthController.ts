import { Request, Response, NextFunction } from "express";
import admService from "../../services/administratorService";
import IAdministrator from "../../interfaces/administratorInterface";
import createTokenHelper from "../../helpers/createTokenHelper";
import encryptPasswordHelper from "../../helpers/encryptPasswordHelper";
import APIError from "../../errors/apiError";

export default class administratorAuthController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private admService: admService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.admService = new admService();
  }

  public async administratorLogin() {
    try {
      const { id, email, password } = this.req.body;

      const adm = await this.admService.getAdmById(id);

      const comparePasswords = await encryptPasswordHelper.compare(
        password,
        adm.password
      );

      const token = createTokenHelper.create({ adm });

      return this.res
        .send({ adm: { name: adm.name, email: adm.email }, token: token })
        .status(200);
    } catch (err: any) {
      if (err instanceof APIError) {
        return this.next(err);
      }

      return this.res.status(500).send({ error: err });
    }
  }

  public async administratorRegister() {
    try {
      const admData: IAdministrator = { ...this.req.body };

      await this.admService.getAdmById(admData.id);

      const encryptPassword = await encryptPasswordHelper.encrypt(
        admData.password
      );

      const newAdm = await this.admService.createAdministrator(admData);

      const token = createTokenHelper.create({ id: newAdm.id });

      return this.res
        .send({
          adm: { id: newAdm.id, name: newAdm.name },
          token: token,
        })
        .status(200);
    } catch (err: any) {
      if (err instanceof APIError) {
        return this.next(err);
      }

      return this.res.status(500).send({ error: err });
    }
  }
}
