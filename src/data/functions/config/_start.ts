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

const client_keys = () => {
  const keys: Key[] = [];

  keys.push({
    index: "photo",
    native: true,
    placeholder: { fr: "photo" },
    props: { required: false },
    type: "avatar",
  });

  keys.push({
    index: "firstname",
    native: true,
    placeholder: { fr: "prénom" },
    props: { required: true },
    type: "text",
  });
  keys.push({
    index: "lastname",
    native: true,
    placeholder: { fr: "nom" },
    props: { required: true },
    type: "text",
  });
  keys.push({
    index: "cin",
    type: "text",
    native: true,
    placeholder: { fr: "numéro pièce d'identité" },
    props: { required: false },
    array: {},
  });

  keys.push({
    index: "address",
    native: true,
    placeholder: { fr: "Adresse" },
    props: { required: false },
    type: "text",
    array: {},
  });
  keys.push({
    index: "phone",
    native: true,
    placeholder: { fr: "Téléphone" },
    props: { required: false },
    type: "phone",
    array: {},
  });
  keys.push({
    index: "mail",
    native: true,
    placeholder: { fr: "Email" },
    props: { required: false },
    type: "mail",
    array: {},
  });

  keys.push({
    index: "status",
    type: "select",
    placeholder: { fr: "effectif global" },
    native: true,
    props: {
      required: true,
      options: [
        { text: "Simple", value: "simple" },
        { text: "Prémium", value: "premium" },
        { text: "Gold", value: "gold" },
      ],
    },
  });

  return keys;
};

export default async () => {
  // user
  let config_user = await functions.config.find({ table: "user" });
  if (!config_user) {
    config_user = await functions.config.add({
      table: "user",
      native: true,
      lock: true,
      placeholder: { fr: "Utilisateur" },
    });
  }

  const keys = user_keys();
  for (const key of keys) {
    await functions.config.key.create({
      config_id: config_user.id.toString(),
      key,
    });
  }

  // client
  let config_client = await functions.config.find({ table: "client" });
  if (!config_client) {
    config_client = await functions.config.add({
      table: "client",
      native: true,
      lock: true,
      placeholder: { fr: "Client" },
    });
  }

  const keys2 = client_keys();
  for (const key of keys2) {
    await functions.config.key.create({
      config_id: config_client.id.toString(),
      key,
    });
  }
};
