import _data from "../../data";

export default async ({
  id,
  data,
}: {
  id: string;
  data: { [key: string]: any };
}) => {
  const user = await _data.functions.user.update({ id, data });
  return user;
};
