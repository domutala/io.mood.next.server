import { Key } from "../../entities/Config";
import functions from "..";

const user_keys = () => {
  const keys: Key[] = [];

  keys.push({
    index: "photo",
    native: true,
    placeholder: { fr: "photo de profil" },
    props: { required: false },
    type: "avatar",
  });
  keys.push({
    index: "name",
    native: true,
    placeholder: { fr: "nom" },
    props: { required: false },
    type: "text",
  });
  keys.push({
    index: "password",
    native: true,
    placeholder: { fr: "mot de passe" },
    props: { required: false },
    type: "password",
  });
  keys.push({
    index: "blocked",
    native: false,
    placeholder: { fr: "bloquer" },
    props: { required: false },
    type: "checkbox",
  });
  keys.push({
    index: "mail",
    native: false,
    placeholder: { fr: "Email" },
    props: { required: true },
    type: "mail",
  });
  keys.push({
    index: "username",
    native: false,
    placeholder: { fr: "Nom d'utilisateur" },
    props: { required: true },
    type: "text",
  });

  return keys;
};

const event_keys = () => {
  const keys: Key[] = [];

  keys.push({
    index: "date",
    native: true,
    placeholder: { fr: "Date" },
    props: { required: true },
    type: "date",
  });

  keys.push({
    index: "description",
    native: true,
    placeholder: { fr: "Description" },
    props: { required: false },
    type: "longtext",
  });

  keys.push({
    index: "photos",
    native: true,
    placeholder: { fr: "Photos" },
    props: { required: true },
    type: "file",
    array: {
      min_length: 1,
      max_length: 5,
    },
  });

  return keys;
};

export default async () => {
  const configs = {
    user: {
      table: "user",
      native: true,
      lock: true,
      placeholder: { fr: "Utilisateur" },
    },
    event: {
      table: "event",
      native: true,
      lock: true,
      placeholder: { fr: "Event" },
    },
  };
  const keys = {
    user: user_keys(),
    event: event_keys(),
  };

  for (const ckey of Object.keys(configs)) {
    let config = await functions.config.find({ table: ckey });
    if (!config) {
      config = await functions.config.add(configs[ckey as "user"]);
    }

    const ckeys = keys[ckey as "user"];
    for (const key of ckeys) {
      await functions.config.key.create({
        config_id: config.id.toString(),
        key,
      });
    }
  }
};
