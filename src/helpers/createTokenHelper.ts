import jwt, { Secret } from "jsonwebtoken";

const SECRET_KEY = <Secret>process.env.SECRET;

export default class createTokenHelper {
  public static create(payload: Object) {
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "2 days",
    });

    return token;
  }
}
