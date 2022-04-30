import _data from "../../data";

export default async ({ mail, name }: { mail: string; name: string }) => {
  const user = await _data.functions.user.add({ mail, name });
  return user;
};
