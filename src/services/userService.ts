import APIError from "../errors/apiError";
import IUser from "../interfaces/userInterface";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class userService {
  public async getAllUsers() {
    const users = await prisma.user.findMany();

    return users;
  }

  public async getUserById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) throw new APIError("Error", "User doesn't exists", 404);

    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) throw new APIError("Error", "User doesn't exists", 404);

    return user;
  }

  public async createUser(userData: IUser) {
    const user = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (user) throw new APIError("Error", "User already exists", 403);

    const newUser = await prisma.user.create({
      data: userData,
    });

    return newUser;
  }

  public async updateUserById(user: IUser) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return updatedUser;
  }

  public async deleteUserById(id: string) {
    this.getUserById(id);

    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return deletedUser;
  }
}
