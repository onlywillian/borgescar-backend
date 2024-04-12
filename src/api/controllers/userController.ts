import { Request, Response } from "express";

import userService from "../../services/userService";
import IUser from "../../interfaces/userInterface";

export default class UserController {
  private req: Request;
  private res: Response;
  private userService: userService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.userService = new userService();
  }

  public async getAllUsers() {
    const users = await this.userService.getAllUsers();

    if (users.length === 0)
      return this.res.status(404).send({ Error: "Nenhum usuário encontrado" });

    return this.res.status(200).send({ users });
  }

  public async getUniqueUser() {
    const { id } = this.req.params;

    const user = await this.userService.getUserById(id);

    if (!user)
      return this.res.status(404).send({ Error: "Usuário não encontrado" });

    return this.res.status(200).send({ user });
  }

  public async createUser() {
    const userData: IUser = { ...this.req.body };

    const user = await this.userService.createUser(userData);

    return this.res.status(200).send({ user });
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
