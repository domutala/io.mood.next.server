import { Key } from "../../../entities/Config";
import functions from "../..";
import { keys } from "../_test";

/**
 * @author domutala
 * @description ajouter un nouvel client
 */
export default async ({ config_id, key }: { config_id: string; key: Key }) => {
  const config = await functions.config.find({ id: config_id });
  if (!config) {
    const error = Error();
    error.name = "_notConfigFound";
    throw error;
  }

  if (Object.prototype.toString.call(key.props) !== "[object Object]") {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  if (
    !["undefined", "boolean"].includes(typeof key.props.required) ||
    !["undefined", "number"].includes(typeof key.props.max_length) ||
    !["undefined", "number"].includes(typeof key.props.min_length) ||
    !["undefined", "number"].includes(typeof key.props.max) ||
    !["undefined", "number"].includes(typeof key.props.min)
  ) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  if (key.array) {
    if (Object.prototype.toString.call(key.array) !== "[object Object]") {
      const error = Error();
      error.name = "_invalidData";
      throw error;
    }

    if (
      !["undefined", "boolean"].includes(typeof key.array.max_length) ||
      !["undefined", "number"].includes(typeof key.props.min_length)
    ) {
      const error = Error();
      error.name = "_invalidData";
      throw error;
    }
  }

  if (!Object.keys(keys).includes(key.type)) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  if (typeof key.native !== "boolean") {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  if (Object.prototype.toString.call(key.placeholder) !== "[object Object]") {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  if (!key.placeholder.fr) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  for (const k of Object.keys(key.placeholder)) {
    if (typeof key.placeholder[k] !== "string" || !key.placeholder[k].length) {
      const error = Error();
      error.name = "_invalidData";
      throw error;
    }
  }

  const i = config.keys.findIndex((k) => k.index === key.index);
  if (i === -1) config.keys.push(key);
  else config.keys[i] = key;

  await config.save();

  return config;
};
