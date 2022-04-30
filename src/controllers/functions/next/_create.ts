import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";
import controllers from "..";
import { Next } from "src/data/entities/Next";

export default async (req: Request, res: Response) => {
  try {
    let next: Next | undefined;

    if (req.query.id) {
      const e = await services.next.get({ id: req.query.id as string });
      if (e) next = e.value;

      if (next && next.user !== req.session?.user) {
        return sender(req, res, { error: { text: "notAuthorized" } });
      }
    }

    next = await services.next.create({ ...req.body });

    req.query.id = next.id.toString();
    controllers.next.get(req, res);
  } catch (error: any) {
    sender(req, res, { error });
  }
};
