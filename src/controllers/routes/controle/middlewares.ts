import { NextFunction, Request, Response } from "express";
import { User } from "../../../data/entities/User";
import { ISession } from "../../../../types/express-extend";

import sender from "../../utils/sender";
import test_session from "./test_session";

export default async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.token as string;
  if (!token) token = req.query.token as string;
  if (token && token.split(" ")[0] === "Bearer") token = token.split(" ")[1];

  try {
    const session = await test_session(token);

    if (typeof session === "string") {
      return sender(req, res, { error: { text: session } });
    }

    req.session = session;
  } catch (error) {
    return sender(req, res, { error: { text: "invalidSession" } });
  }

  delete req.query.token;

  return next();
};

export const access = (domain: string, role?: "read" | "write") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = req.session as ISession;
    const user = session._user as User;

    // if (!user.super) {
    //   const i = Object.keys(user.data).indexOf(domain);

    //   if (i === -1) {
    //     return sender(req, res, { error: { text: "notAuthorized" } });
    //   }

    //   if (role) {
    //     const access = Object.values(user.data.access)[i];
    //     access === role;
    //   }
    // }

    return next();
  };
};

export const is_admin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = req.session as ISession;
    const user = session._user as User;

    if (!user.super) {
      return sender(req, res, { error: { text: "notAuthorized" } });
    }

    return next();
  };
};
