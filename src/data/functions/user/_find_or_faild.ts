import functions from "..";

/**
 * Trouver un utilisateur
 * @author domutala
 */
export default async ({
  id,
  mail,
  phone,
  username,
  uid,
}: {
  id?: string;
  mail?: string;
  phone?: string;
  username?: string;
  uid?: string;
}) => {
  const user = await functions.user.find({ id, mail, phone, username, uid });
  if (!user) {
    const error = Error();
    error.name = "_userNotFound";
    error.message = "Aucun utilisateur n'est trouvé";
    throw error;
  }

  return user;
};
