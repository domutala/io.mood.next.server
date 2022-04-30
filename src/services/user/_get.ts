import data from "../../data";

export default async ({ id }: { id?: string }) => {
  const user = await data.functions.user.find({ id });
  let format: { [key: string]: any } = {};

  if (user) {
    if (user.data.password) delete user.data.password;
    const config = await data.functions.config.find({ table: "user" });
    format = await data.functions.config.format(config as any, user.data);

    return { value: user, format };
  }

  return;
};
