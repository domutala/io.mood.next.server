import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";
import controllers from "..";
import { Event } from "src/data/entities/Event";

export default async (req: Request, res: Response) => {
  try {
    let event: Event | undefined;

    if (req.query.id) {
      const e = await services.event.get({ id: req.query.id as string });
      if (e) event = e.value;

      if (event && event.user !== req.session?.user) {
        return sender(req, res, { error: { text: "notAuthorized" } });
      }
    }

    event = await services.event.create({ ...req.body });

    req.query.id = event.id.toString();
    controllers.event.get(req, res);
  } catch (error: any) {
    sender(req, res, { error });
  }
};
