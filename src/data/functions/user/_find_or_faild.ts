import functions from "..";

/**
 * Trouver un utilisateur
 * @author domutala
 */
export default async ({
  id,
  mail,
  phone,
}: {
  id?: string;
  mail?: string;
  phone?: string;
}) => {
  const user = await functions.user.find({ id, mail, phone });
  if (!user) {
    const error = Error();
    error.name = "_userNotFound";
    error.message = "Aucun utilisateur n'est trouvé";
    throw error;
  }

  return user;
};
