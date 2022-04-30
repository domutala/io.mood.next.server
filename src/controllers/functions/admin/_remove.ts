import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const user = await services.user.get({ id: req.query.id as string });

    if (!user || !user.value) {
      return sender(req, res, { error: { text: "userNotFound" } });
    }

    if (req.session?.user === user.value.id.toString()) {
      return sender(req, res, { error: { text: "notAuthorized" } });
    }

    if (user.value.super) {
      return sender(req, res, { error: { text: "notAuthorized" } });
    }

    await services.user.remove({ id: user.value.id.toString() });

    sender(req, res, { value: true });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
