import functions from "../..";

/**
 * @author domutala
 * @description ajouter un nouvel client
 */
export default async ({
  config_id,
  index,
}: {
  config_id: string;
  index: string | number;
}) => {
  const config = await functions.config.find({ id: config_id });
  if (!config) {
    const error = Error();
    error.name = "_notConfigFound";
    throw error;
  }

  const i = config.keys.findIndex((k) => k.index === index);
  if (i !== -1) config.keys.splice(i, 1);

  await config.save();

  return config;
};
