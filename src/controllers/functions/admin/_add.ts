import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";
import controllers from "..";

export default async (req: Request, res: Response) => {
  try {
    delete req.body.id;
    const user = await services.user.add({ ...req.body });

    req.query.id = user.id.toString();
    controllers.user.get(req, res);
  } catch (error: any) {
    sender(req, res, { error });
  }
};
