import { NextFunction, Request, Response } from "express";

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
