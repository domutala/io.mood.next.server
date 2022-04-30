import { User } from "../../entities/User";
import functions from "..";

/**
 * @author domutala
 * @description ajouter un nouvel user
 */
export default async ({ mail, name }: { name: string; mail: string }) => {
  const config = await functions.config.find({ table: "user" });
  if (!config) {
    const error = Error();
    error.name = "_configNotFound";
    throw error;
  }

  const keys = config.keys.filter((key) =>
    ["mail", "name"].includes(key.index)
  );
  await functions.config.test(keys, { mail, name });

  const user = new User();
  user.data = { name, mail, admin: null, leave: null, effectif: null };

  await user.save();

  return user;
};
