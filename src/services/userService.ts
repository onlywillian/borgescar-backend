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

    return user;
  }

  public async createUser(userData: IUser) {
    const user = await prisma.user.findFirst({
      where: {
        id: userData.id,
      },
    });

    if (user) throw new APIError("Error", "User already exists", 403);

    const newUser = await prisma.user.create({
      data: userData,
    });

    return newUser;
  }

  public async updateUserById(id: string, user: IUser) {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: user,
    });

    return updatedUser;
  }

  public async deleteUserById(id: string) {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return deletedUser;
  }
}
