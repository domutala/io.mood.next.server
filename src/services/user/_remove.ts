import data from "../../data";

export default async ({ id }: { id: string }) => {
  const user = await data.functions.user.remove({ id });
  return user;
};
