import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";
import controllers from "..";

export default async (req: Request, res: Response) => {
  try {
    if (req.session?.user !== req.query.user && !req.session?._user?.super) {
      sender(req, res, { error: { text: "notAuthorized" } });
    }

    delete req.body.id;
    await services.user.update({ id: req.query.id as string, data: req.body });

    controllers.user.get(req, res);
  } catch (error: any) {
    sender(req, res, { error });
  }
};
