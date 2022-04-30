import * as jwtoken from "jsonwebtoken";

import utils from "../../../utils";
import data from "../../../data";
import { ISession } from "../../../../types/express-extend";

export default async (token: string) => {
  const sess = jwtoken.verify(
    token,
    Buffer.from(utils.rsa.get().private_key, "base64")
  ) as any;

  const session = (await data.functions.session.find({
    id: sess.id,
  })) as ISession;

  if (!session) return "notSessionFound";
  if (session.expired) return "sessionExpired";

  // chargement des données utilisateur
  if (!session.user) return "sessionNotHaveUser";

  session._user = await data.functions.user.find({ id: session.user });
  if (!session._user) return "sessionNotHaveUser";
  if (session._user.data.blocked) return "userBlocked";

  return session;
};
