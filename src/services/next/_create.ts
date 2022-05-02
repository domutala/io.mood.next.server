import { User } from "../../data/entities/User";
import _data from "../../data";

export default async ({
  id,
  data,
  user,
}: {
  id?: string;
  data: { [key: string]: any };
  user: User;
}) => {
  const next = await _data.functions.next.create({ id, data, user });
  return next;
};
