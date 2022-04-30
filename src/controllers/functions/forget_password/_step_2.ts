import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const token = await services.session.forget_password.step_2({
      token: req.body.token,
      code: req.body.code,
    });

    sender(req, res, { value: { token } });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
