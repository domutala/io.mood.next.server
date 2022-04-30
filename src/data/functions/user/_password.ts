import functions from "..";
import utils from "../../../utils";

/**
 * @author domutala
 */
export default async ({
  id,
  password,
  password_confirmation,
}: {
  id?: string;
  password: string;
  password_confirmation: string;
}) => {
  const config = await functions.config.find({ table: "user" });
  if (!config) {
    const error = Error();
    error.name = "_configNotFound";
    throw error;
  }

  const user = await functions.user.find_or_faild({ id });
  const key = config.keys.filter((key) => key.index === "password")[0];
  await functions.config.test([key], { password });

  if (password !== password_confirmation) {
    const error = Error();
    error.name = "_passwordsNotMatched";
    throw error;
  }

  password = JSON.stringify(utils.rsa.encrypter({ data: password }));
  user.data.password = password;

  await user.save();

  return user;
};
