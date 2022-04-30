import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";
import controllers from "../../functions";

export default async (req: Request, res: Response) => {
  try {
    const client = await services.client.create({ ...req.body });

    req.query.id = client.id.toString();
    controllers.client.get(req, res);
  } catch (error: any) {
    sender(req, res, { error });
  }
};
