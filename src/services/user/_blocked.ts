import _data from "../../data";

export default async ({ id, blocked }: { id: string; blocked: boolean }) => {
  const user = await _data.functions.user.blocked({ id, blocked });
  return user;
};
