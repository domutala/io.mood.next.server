import { Request, Response } from "express";

import sender from "../utils/sender";
import services from "../../services";

export default async (req: Request, res: Response) => {
  try {
    await services.session.logout({ session: req.session });

    sender(req, res, { value: true });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
