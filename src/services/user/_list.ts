import data from "../../data";

export default async () => {
  const users = await data.functions.user.list();
  return users;
};
