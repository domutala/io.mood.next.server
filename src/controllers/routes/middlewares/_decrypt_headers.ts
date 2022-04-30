import { NextFunction, Request, Response } from "express";
import utils from "../../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;

  if (token) {
    req.headers.token = utils.rsa.decrypter({ data: JSON.parse(token) });
  }

  return next();
};
