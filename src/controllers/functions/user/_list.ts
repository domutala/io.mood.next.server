import { Request, Response } from "express";

import sender from "../../utils/sender";
import services from "../../../services";

export default async (req: Request, res: Response) => {
  try {
    const users = await services.user.list();
    sender(req, res, { value: users });
  } catch (error: any) {
    sender(req, res, { error });
  }
};
