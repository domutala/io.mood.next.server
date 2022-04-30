import * as jwtoken from "jsonwebtoken";
import { Request, Response } from "express";

import sender from "../utils/sender";
import services from "../../services";
import utils from "../../utils";

export default async (req: Request, res: Response) => {
  try {
    const client_public_key = req.body.public_key as string;

    const session = await services.session.create({
      public_key: client_public_key,
      session: req.session,
    });

    const token = jwtoken.sign(
      { id: session.id },
      Buffer.from(utils.rsa.get().private_key, "base64"),
      { header: { typ: "JWT", alg: "HS256" }, expiresIn: 60 * 60 * 24 }
    );

    req.session = session;

    const response: any = {
      token,
      public_key: utils.rsa.get().public_key,
    };

    if (session.user) {
      response.user = await services.user.get({
        id: req.session.user as string,
      });
    }

    sender(req, res, { value: response });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
