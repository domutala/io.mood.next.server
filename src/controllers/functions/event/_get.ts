import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const event = await services.event.get({
      id: req.query.id as string,
    });
    sender(req, res, { value: event });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
