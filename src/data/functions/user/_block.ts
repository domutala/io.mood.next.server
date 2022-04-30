import functions from "..";

/**
 * @author domutala
 */
export default async ({ id, blocked }: { id?: string; blocked: boolean }) => {
  const config = await functions.config.find({ table: "user" });
  if (!config) {
    const error = Error();
    error.name = "_configNotFound";
    throw error;
  }

  const user = await functions.user.find_or_faild({ id });
  const key = config.keys.filter((key) => key.index === "blocked")[0];
  await functions.config.test([key], { blocked });
  user.data.blocked = blocked;

  await user.save();

  return user;
};
