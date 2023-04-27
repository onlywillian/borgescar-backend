import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const SECRET_KEY = <Secret>process.env.SECRET;

// export interface CustomRequest extends Request {
//   token: string | JwtPayload;
// }

function checkToken(req: Request, res: Response, next: NextFunction) {
  // getting token from headers
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.send({ Error: "Token is not provided" }).status(401);

  try {
    // decrypting jwt
    const decoded = jwt.verify(token, SECRET_KEY);
    // (req as CustomRequest).token = decoded;

    return next();
  } catch (err) {
    return res.send({ Error: "Token inválido" }).status(401);
  }
}

export default checkToken;
