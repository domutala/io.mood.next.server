import _data from "../../data";

export default async ({
  id,
  data,
}: {
  id?: string;
  data: { [key: string]: any };
}) => {
  const next = await _data.functions.next.create({ id, data });
  return next;
};
