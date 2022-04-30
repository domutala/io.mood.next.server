import { Request, Response } from "express";

import services from "../../../services";
import sender from "../../utils/sender";

export default async (req: Request, res: Response) => {
  try {
    req.session = await services.session.login.email_and_password({
      session: req.session as any,
      mail: req.body.mail,
      password: req.body.password,
    });

    sender(req, res, { value: true });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
