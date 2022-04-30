import { Request, Response } from "express";
import * as jwtoken from "jsonwebtoken";

import sender from "../../utils/sender";
import utils from "../../../utils";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const file = await services.file.get({ id });
    if (!file) return sender(req, res, { error: { text: "notFileFound" } });

    file.value = "";

    const options: jwtoken.SignOptions = {
      expiresIn: "2h",
      header: {
        typ: "JWT",
        alg: "HS256",
      },
    };

    const token = jwtoken.sign(
      { session: req.session?.id.toString(), file: id },
      Buffer.from(utils.rsa.get().private_key, "base64"),
      options
    );

    sender(req, res, { value: { ...file, token } });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
