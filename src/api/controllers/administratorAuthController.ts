import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import admService from "../../services/administratorService";
import IUser from "../../interfaces/userInterface";
import IAdministrator from "../../interfaces/administratorInterface";

const SECRET_KEY = <Secret>process.env.SECRET_KEY;

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

      const comparePassword = await bcrypt.compare(password, adm.password);

      if (!comparePassword)
        return this.res.send({ Error: "Wrong password" }).status(401);

      const token = jwt.sign(
        {
          id: adm?.id,
          name: adm?.name,
          email: adm?.email,
          password: adm?.password,
        },
        SECRET_KEY,
        {
          expiresIn: "2 days",
        }
      );

      return this.res
        .send({ adm: { name: adm.name, email: adm.email }, token: token })
        .status(200);
    } catch (err: any) {
      this.next(err);
    }
  }

  public async administratorRegister() {
    try {
      const admData: IAdministrator = { ...this.req.body };

      const adm = await this.admService.getAdmById(admData.id);

      // Encrypting password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(admData.password, salt);

      const newadm: any = await this.admService.createAdministrator(admData);

      // Creating jwt token
      const token = jwt.sign(
        {
          id: newadm?.id,
        },
        SECRET_KEY,
        {
          expiresIn: "2 days",
        }
      );

      return this.res
        .send({
          adm: { id: newadm.id, name: newadm.name },
          token: token,
        })
        .status(200);
    } catch (err: any) {
      this.next(err);
    }
  }
}
