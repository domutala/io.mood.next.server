import * as jwtoken from "jsonwebtoken";

import utils from "../../../utils";
import data from "../../../data";

export default async ({ mail }: { mail: string }) => {
  const user = await data.functions.user.find_or_faild({ mail });

  const code = utils.token.generate_1({ length: 6 });
  const token = jwtoken.sign(
    { code, user: user.id },
    Buffer.from(utils.rsa.get().private_key, "base64"),
    { header: { typ: "JWT", alg: "HS256" }, expiresIn: "1h" }
  );

  console.log(code);

  return token;
};
