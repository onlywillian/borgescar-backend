import { Request, Response, NextFunction } from "express";
import userService from "../../services/userService";
import IUser from "../../interfaces/userInterface";
import APIError from "../../errors/apiError";

import createTokenHelper from "../../helpers/createTokenHelper";
import encryptPasswordHelper from "../../helpers/encryptPasswordHelper";

export default class userAuthController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private userService: userService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.userService = new userService();
  }

  public async userLogin() {
    try {
      const { email, password } = this.req.body;

      const user = await this.userService.getUserByEmail(email);

      const comparePasswords = await encryptPasswordHelper.compare(
        password,
        user.password
      );

      const token = createTokenHelper.create({ user });

      return this.res
        .status(200)
        .send({ user: { name: user.name, email: user.email }, token: token });
    } catch (err: any) {
      if (err instanceof APIError) {
        return this.next(err);
      }

      return this.res.status(500).send({ error: err });
    }
  }

  public async userRegister() {
    try {
      const userData: IUser = { ...this.req.body };

      const encryptPassword = await encryptPasswordHelper.encrypt(
        userData.password
      );

      const newUser = await this.userService.createUser(userData);

      const token = createTokenHelper.create({ id: newUser.id });

      return this.res
        .send({
          user: { id: newUser.id, name: newUser.name },
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
