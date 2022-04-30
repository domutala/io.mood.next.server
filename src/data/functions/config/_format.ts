import utils from "../../../utils";
import { Config, Key } from "../../entities/Config";
import * as jwtoken from "jsonwebtoken";

export default async (config: Config, values: { [key: string]: any }) => {
  const formats: { [key: string]: Key } = {};

  for (const key of config.keys) {
    if (![undefined, null].includes(values[key.index])) {
      key.value = values[key.index];
      key.value = await one(key);
      formats[key.index] = key;
    }
  }

  return formats;
};

const one = async (key: Key) => {
  if (Array.isArray(key.value)) {
    const vs: any[] = [];
    for (const v of key.value) vs.push(await one({ ...key, value: v }));
    return vs;
  }

  return await keys[key.type](key.value);
};

const keys: {
  [key: string]: (v: any) => any | Promise<any>;
} = {
  checkbox: (v: boolean) => v,
  text: (v: string) => v,
  longtext: (v: string) => keys.text(v),
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

  file: (v: string) => {
    const options: jwtoken.SignOptions = {
      expiresIn: "2h",
      header: {
        typ: "JWT",
        alg: "HS256",
      },
    };

    const token = jwtoken.sign(
      { file: v },
      Buffer.from(utils.rsa.get().private_key, "base64"),
      options
    );

    return token;
  },
  avatar: (v: string) => keys.file(v),
  password: () => null,

  select: (v: any) => v,
};
