import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const token = await services.session.forget_password.step_1({
      mail: req.body.mail,
    });

    sender(req, res, { value: { token } });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
