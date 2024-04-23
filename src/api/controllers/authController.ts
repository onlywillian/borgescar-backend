import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import userService from "../../services/userService";
import IUser from "../../interfaces/userInterface";

const SECRET_KEY = <Secret>process.env.SECRET_KEY;

export default class AuthController {
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
      const { id, email, password } = this.req.body;

      const user = await this.userService.getUserById(id);

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword)
        return this.res.send({ Error: "Wrong password" }).status(401);

      const token = jwt.sign(
        {
          name: user?.name,
          email: user?.email,
        },
        SECRET_KEY,
        {
          expiresIn: "2 days",
        }
      );

      return this.res
        .send({ user: { name: user.name, email: user.email }, token: token })
        .status(200);
    } catch (err: any) {
      this.next(err);
    }
  }

  public async userRegister() {
    try {
      const { id, name, email, password }: IUser = this.req.body;

      const user = await this.userService.getUserById(id);

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await this.userService.createUser(this.req.body);

      const token = jwt.sign(
        {
          id: newUser?.id,
        },
        SECRET_KEY,
        {
          expiresIn: "2 days",
        }
      );

      return this.res
        .send({
          user: { id: newUser.id, name: newUser.name },
          token: token,
        })
        .status(200);
    } catch (err: any) {
      this.next(err);
    }
  }
}
