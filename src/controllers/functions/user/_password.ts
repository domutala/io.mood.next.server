import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";
import controllers from "..";

export default async (req: Request, res: Response) => {
  try {
    const user = await services.user.get({ id: req.query.id as string });

    if (!user || !user.value) {
      return sender(req, res, { error: { text: "userNotFound" } });
    }

    if (req.session?.user !== user.value.id.toString()) {
      return sender(req, res, { error: { text: "notAuthorized" } });
    }

    delete req.body.id;
    await services.user.password({
      id: user.value.id.toString(),
      ...req.body,
    });

    req.query.id = user.value.id.toString();
    controllers.user.get(req, res);
  } catch (error: any) {
    sender(req, res, { error });
  }
};
