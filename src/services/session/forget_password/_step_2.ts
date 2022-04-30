import * as jwtoken from "jsonwebtoken";

import utils from "../../../utils";

export default async ({ token, code }: { token: string; code: string }) => {
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

  if (v.code !== code) {
    const error = new Error();
    error.name = "_notValidCode";
    error.message = "Le code de validation n'est pas valide";
    throw error;
  }

  const _token = jwtoken.sign(
    { confirm: true, user: v.user },
    Buffer.from(utils.rsa.get().private_key, "base64"),
    { header: { typ: "JWT", alg: "HS256" }, expiresIn: 60 * 5 }
  );

  return _token;
};
