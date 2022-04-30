import { Config } from "../../entities/Config";

/**
 * @author domutala
 * @description ajouter un nouvel config
 */
export default async ({
  table,
  native = false,
  lock = false,
  placeholder,
}: {
  table: string;
  native: boolean;
  lock: boolean;
  placeholder: { fr: string; [key: string]: string | undefined };
}) => {
  if (typeof native !== "boolean") {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  if (typeof lock !== "boolean") {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  const config = new Config();

  config.keys = [];
  config.table = table;
  config.native = native;
  config.lock = lock;
  config.placeholder = placeholder;

  await config.save();

  return config;
};
