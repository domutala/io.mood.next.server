import functions from "..";

/**
 * ajouter un nouvel utilisateur
 * @author domutala
 * @version 0.2.0
 */
export default async ({ id }: { id: string }) => {
  const user = await functions.user.find_or_faild({ id });
  await user.remove();

  return user;
};
