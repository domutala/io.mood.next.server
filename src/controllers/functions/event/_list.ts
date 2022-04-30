import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const users = await services.event.list({
      access: req.query.access as string,
      value: req.query.value as string,
    });
    sender(req, res, { value: users });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
