import functions from "..";
import utils from "../../../utils";

export interface Key {
  index: string | number;
  native?: boolean;
  required?: boolean;
  type: string;
  placeholder: { [key: string]: string };

  array?: { min_length?: number; max_length?: number };
  value?: any;

  props?: {
    required?: boolean;
    min_length?: number;
    max_length?: number;
    min?: number;
    max?: number;
  };
}

export const tester = async (key: Key) => {
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
    for (const v of key.value) await tester({ ...key, value: v });
    return;
  }

  const result = await test[key.type](key);

  if (!result) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }
};

export const formater = async (key: Key) => {
  if (Array.isArray(key.value)) {
    const vs: any[] = [];
    for (const v of key.value) vs.push(await formater({ ...key, value: v }));
    return vs;
  }

  return await format[key.type](key);
};

const getkeys = async () => {
  const keys: Key[] = [];

  keys.push({
    index: 0,
    native: true,
    placeholder: { fr: "Photo" },
    required: false,
    type: "avatar",
  });

  keys.push({
    index: 1,
    native: true,
    placeholder: { fr: "Prénom" },
    required: true,
    type: "text",
  });
  keys.push({
    index: 2,
    native: true,
    placeholder: { fr: "Nom" },
    required: true,
    type: "text",
  });

  keys.push({
    index: 3,
    native: true,
    placeholder: { fr: "Date de naissance" },
    required: false,
    type: "date",
  });
  keys.push({
    index: 4,
    native: true,
    placeholder: { fr: "Lieu de naissance" },
    required: false,
    type: "text",
  });

  keys.push({
    index: 5,
    placeholder: { fr: "Adresse" },
    required: false,
    type: "text",
    array: {},
  });
  keys.push({
    index: 6,
    placeholder: { fr: "Téléphone" },
    required: false,
    type: "phone",
    array: {},
  });
  keys.push({
    index: 7,
    placeholder: { fr: "Email" },
    required: false,
    type: "mail",
    array: {},
  });

  keys.push({
    index: 8,
    placeholder: { fr: "Matricule" },
    required: true,
    props: {
      min_length: 4,
      max_length: 4,
    },
    type: "text",
  });

  return keys;
};

const test: {
  [key: string]: (param: Key) => boolean | Promise<boolean>;
} = {
  checkbox: (param: Key) => {
    if (!["boolean", "undefined"].includes(typeof param.value)) return false;
    if (param.required && typeof param.value !== "boolean") return false;

    return true;
  },
  text: (param: Key) => {
    if (!["string", "undefined"].includes(typeof param.value)) return false;
    if (param.required && (!param.value || !param.value.length)) return false;

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
  number: (param: Key) => {
    if (!["number", "undefined"].includes(typeof param.value)) return false;
    if (param.required && typeof param.value !== "number") return false;

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
    if (param.required && !param.value) return false;
    if (!param.value) return true;
    return utils.regex.mail(param.value);
  },
  url: (param: Key) => {
    if (param.required && !param.value) return false;
    if (!param.value) return true;
    return utils.regex.url(param.value);
  },
  phone: (param: Key) => {
    if (param.required && !param.value) return false;
    if (!param.value) return true;
    return utils.phone.is_valid(param.value);
  },

  time: (param: Key) => {
    if (param.required && !param.value) return false;
    if (!param.value) return true;
    return utils.regex.time(param.value);
  },
  date: (param: Key) => {
    if (param.required && !param.value) return false;
    if (!param.value) return true;
    return utils.date.test(param.value);
  },

  file: async (param: Key) => {
    if (param.required && !param.value) return false;
    if (!param.value) return true;

    const f = await functions.file.find({ id: param.value });
    if (!f) return false;

    return true;
  },
  avatar: async (param: Key) => {
    if (param.required && !param.value) return false;
    if (!param.value) return true;

    const f = await functions.file.find({ id: param.value });
    if (!f) return false;
    if (!["imge/png", "image/jpg", "image/jpeg"].includes(f.type)) return false;

    return true;
  },

  sexe: (param: Key) => {
    if (param.required && !param.value) return false;
    return [undefined, 1, 2].includes(param.value);
  },
};

const format: {
  [key: string]: (v: any) => any | Promise<any>;
} = {
  checkbox: (v: boolean) => v,
  text: (v: string) => v,
  number: (v: number) => utils.number.formater(v),

  mail: (v: string) => v,
  url: (v: string) => v,
  phone: (v: string) => utils.phone.format(v, true),

  time: (v: string) => v,
  date: (v: string | Date) => utils.date.formater(v),
  sexe: (v?: 1 | 2) => {
    if (!v) return "";
    return { 1: "Homme", 2: false }[v];
  },

  file: (v: string | Date) => v,
  avatar: (v: string | Date) => v,
};

export default { test, format, getkeys, tester, formater };
