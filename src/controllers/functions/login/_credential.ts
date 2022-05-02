import { Request, Response } from "express";

import services from "../../../services";
import sender from "../../utils/sender";
import controllers from "..";

export default async (req: Request, res: Response) => {
  try {
    const firebase_id_token = req.body.firebase_id_token;

    if (!firebase_id_token) {
      return sender(req, res, { error: { text: "firebaseTokenError" } });
    }

    req.session = await services.session.login.credential({
      session: req.session as any,
      firebase_id_token,
    });

    controllers.init_session(req, res);
  } catch (error: any) {
    sender(req, res, { error });
  }
};
