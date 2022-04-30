import { NextFunction, Request, Response } from "express";
import * as jwtoken from "jsonwebtoken";

import data from "../../../data";
import utils from "../../../utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.token as string;
  if (!token) token = req.query.token as string;
  if (token && token.split(" ")[0] === "Bearer") token = token.split(" ")[1];

  if (token) {
    try {
      const sess = jwtoken.verify(
        token,
        Buffer.from(utils.rsa.get().private_key, "base64")
      ) as any;

      req.session = await data.functions.session.find({ id: sess.id });

      if (req.session) {
        if (req.session.user) {
          req.session._user = await data.functions.user.find({
            id: req.session.user,
          });
        }
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}

    delete req.query.token;
  }

  const ftoken = req.query.ftoken as string;
  if (ftoken) {
    try {
      req.ftoken = jwtoken.verify(
        ftoken,
        Buffer.from(utils.rsa.get().private_key, "base64")
      ) as any;

      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return next();
};
