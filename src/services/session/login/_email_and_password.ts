import data from "../../../data";
import utils from "../../../utils";
import { ISession } from "../../../../types/express-extend";

export default async ({
  session,
  mail,
  password,
}: {
  session: ISession;
  mail: string;
  password: string;
}) => {
  const user = await data.functions.user.find_or_faild({ mail });

  if (
    !user.data.password ||
    !password ||
    utils.rsa.decrypter({ data: JSON.parse(user.data.password) }) !== password
  ) {
    const error = Error();
    error.name = "_incorrectPassword";
    error.message = "Mot de passe incorrecte";
    throw error;
  }
  if (user.data.blocked) {
    const error = Error();
    error.name = "_userBlocked";
    error.message = "Ce compte utilisateur est blocqué.";
    throw error;
  }

  await data.functions.session.update({
    id: session.id.toString(),
    user_id: user.id.toString(),
  });

  session.user = user.id.toString();
  session._user = user;

  return session;
};
