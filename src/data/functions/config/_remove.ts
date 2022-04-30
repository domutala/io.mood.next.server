import functions from "..";

/**
 * @author domutala
 * @description ajouter un nouvel config
 */
export default async ({ id }: { id: string }) => {
  const config = await functions.config.find({ id });
  if (!config) {
    const error = Error();
    error.name = "_notConfigFound";
    throw error;
  }

  await config.remove();

  return config;
};
