import functions from "..";

/**
 * @author domutala
 */
export default async ({
  id,
  data,
}: {
  id: string;
  data: { [key: string]: any };
}) => {
  const config = await functions.config.find({ table: "user" });
  if (!config) {
    const error = Error();
    error.name = "_configNotFound";
    throw error;
  }

  const user = await functions.user.find_or_faild({ id });

  for (const dt of Object.keys(data)) {
    if (!["photo", "name"].includes(dt)) {
      const error = Error();
      error.name = "_invalidData";
      throw error;
    }

    const key = config.keys.filter((key) => key.index === dt)[0];
    await functions.config.test([key], { [dt]: data[dt] });

    user.data[dt] = data[dt];
  }

  await user.save();

  return user;
};
