import data from "../../data";
import { ISession } from "../../../types/express-extend";

/**
 * @name login_step_1
 * @author domutala
 * @description initialiser un nouvelle session
 * @version 0.2.0
 */
export default async ({
  session,
  public_key,
}: {
  session?: ISession;
  public_key: string;
}) => {
  if (!public_key) {
    const error = new Error();
    error.name = "_notPublicKeyFound";
    error.message = "Aucune clé publique trouvée";
  }

  // vérifier si la session n'est pas expirée
  if (!session || session.expired) {
    // créer un nouvelle session
    session = await data.functions.session.add({ public_key });
  }

  return session;
};
