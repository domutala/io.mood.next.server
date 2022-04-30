import * as jwtoken from "jsonwebtoken";

import _data from "../../../data";
import utils from "../../../utils";

export default async ({
  token,
  password,
  password_confirmation,
}: {
  token: string;
  password: string;
  password_confirmation: string;
}) => {
  let v: any;
  try {
    v = jwtoken.verify(
      token,
      Buffer.from(utils.rsa.get().private_key, "base64")
    );
  } catch (err) {
    const error = new Error();
    error.name = "_notValidToken";
    error.message = "token non valide";
    throw error;
  }

  if (!v.confirm) {
    const error = new Error();
    error.name = "_notValidCode";
    error.message = "Le code de validation n'est pas valide";
    throw error;
  }

  if (password !== password_confirmation) {
    const error = Error();
    error.name = "_notMatchPasswords";
    throw error;
  }

  const user = await _data.functions.user.password({
    id: v.user,
    password,
    password_confirmation,
  });

  return user;
};
