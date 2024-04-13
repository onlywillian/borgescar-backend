import { NextFunction, Request, Response } from "express";

import userService from "../../services/userService";
import IUser from "../../interfaces/userInterface";

export default class UserController {
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

  public async getAllUsers() {
    const users = await this.userService.getAllUsers();

    return this.res.status(200).send({ users });
  }

  public async getUniqueUser() {
    const { id } = this.req.params;

    const user = await this.userService.getUserById(id);

    return this.res.status(200).send({ user });
  }

  public async createUser() {
    try {
      const userData: IUser = { ...this.req.body };

      const user = await this.userService.createUser(userData);

      return this.res.status(200).send({ user });
    } catch (err: any) {
      this.next(err);
    }
  }

  public async updateUser() {
    const userData = this.req.body;

    const user = await this.userService.updateUserById(userData.id, userData);

    return this.res.status(200).send({ user });
  }

  public async deleteUser() {
    const { id } = this.req.body;

    const user = await this.userService.deleteUserById(id);

    return this.res.status(200).send({ user });
  }
}
