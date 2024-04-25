import bcrypt from "bcrypt";
import APIError from "../errors/apiError";

export default class encryptPasswordHelper {
  public static async encrypt(password: string) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
  }

  public static async compare(
    referencePassword: string,
    passwordToBeCompared: string
  ) {
    const comparePassword = await bcrypt.compare(
      referencePassword,
      passwordToBeCompared
    );

    if (!comparePassword) throw new APIError("Error", "Wrong password", 401);

    return comparePassword;
  }
}
