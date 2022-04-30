import functions from "..";
import utils from "../../../utils";
import { Key } from "../../entities/Config";

export default async (keys: Key[], values: { [key: string]: any }) => {
  for (const key of keys) {
    key.value = values[key.index];
    await one(key);
  }

  for (const key of Object.keys(values)) {
    if (keys.findIndex((k) => k.index === key) === -1) {
      const error = Error();
      error.name = "_invalidData";
      throw error;
    }
  }
};

const one = async (key: Key) => {
  if (typeof key.array === "object") {
    if (!key.value) key.value = [];

    if (!Array.isArray(key.value)) {
      const error = Error();
      error.name = "_invalidData";
      throw error;
    }

    if (key.array.max_length && key.value.length > key.array.max_length) {
      const error = Error();
      error.name = "_invalidData";
      throw error;
    }
    if (key.array.min_length && key.value.length < key.array.min_length) {
      const error = Error();
      error.name = "_invalidData";
      throw error;
    }

    delete key.array;
    for (const v of key.value) await one({ ...key, value: v });
    return;
  }

  const result = await keys[key.type](key);

  if (!result) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }
};

export const keys: {
  [key: string]: (param: Key) => boolean | Promise<boolean>;
} = {
  checkbox: (param: Key) => {
    if (!["boolean", "undefined"].includes(typeof param.value)) return false;
    if (param.props.required && typeof param.value !== "boolean") return false;

    return true;
  },
  text: (param: Key) => {
    if (!["string", "undefined"].includes(typeof param.value)) return false;
    if (param.props.required && (!param.value || !param.value.length))
      return false;

    if (param.value) {
      if (typeof param.value !== "string") return false;

      if (param.props) {
        if (
          param.props.min_length &&
          param.value.length < param.props.min_length
        ) {
          return false;
        }
        if (
          param.props.max_length &&
          param.value.length > param.props.max_length
        ) {
          return false;
        }
      }
    }

    return true;
  },
  longtext: (param: Key) => keys.text(param),
  number: (param: Key) => {
    if (!["number", "undefined"].includes(typeof param.value)) return false;
    if (param.props.required && typeof param.value !== "number") return false;

    if (typeof param.value === "number") {
      if (param.props) {
        if (
          typeof param.props.min === "number" &&
          param.value < param.props.min
        ) {
          return false;
        }
        if (
          typeof param.props.max === "number" &&
          param.value > param.props.max
        ) {
          return false;
        }
      }
    }

    return true;
  },

  mail: (param: Key) => {
    if (param.props.required && !param.value) return false;
    if (!param.value) return true;
    return utils.regex.mail(param.value);
  },
  url: (param: Key) => {
    if (param.props.required && !param.value) return false;
    if (!param.value) return true;
    return utils.regex.url(param.value);
  },
  phone: (param: Key) => {
    if (param.props.required && !param.value) return false;
    if (!param.value) return true;
    return utils.phone.is_valid(param.value);
  },

  time: (param: Key) => {
    if (param.props.required && !param.value) return false;
    if (!param.value) return true;
    return utils.regex.time(param.value);
  },
  date: (param: Key) => {
    if (param.props.required && !param.value) return false;
    if (!param.value) return true;
    return utils.date.test(param.value);
  },

  file: async (param: Key) => {
    if (param.props.required && !param.value) return false;
    if (!param.value) return true;

    const f = await functions.file.find({ id: param.value });
    if (!f) return false;

    return true;
  },
  avatar: async (param: Key) => {
    if (param.props.required && !param.value) return false;
    if (!param.value) return true;

    const f = await functions.file.find({ id: param.value });

    if (!f) return false;
    if (!["image/png", "image/jpg", "image/jpeg"].includes(f.type))
      return false;

    return true;
  },

  sexe: (param: Key) => {
    if (param.props.required && !param.value) return false;
    return [undefined, 1, 2].includes(param.value);
  },

  password: (param: Key) => {
    if (param.props.required && !param.value) return false;
    if (typeof param.value !== "string") return false;
    return param.value.length >= 6;
  },

  select: (param: Key) => {
    if (param.props.required && typeof param.value === "undefined")
      return false;

    if (Array.isArray(param.props.options)) {
      const i = param.props.options.findIndex(
        (option) => option.value === param.value
      );
      if (i === -1) return false;
      return true;
    }

    return false;
  },
};
