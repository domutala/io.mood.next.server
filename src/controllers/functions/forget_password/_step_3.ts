import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    await services.session.forget_password.step_3({
      token: req.body.token,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation,
    });

    sender(req, res, { value: true });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
