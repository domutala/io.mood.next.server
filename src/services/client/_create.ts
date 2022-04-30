import _data from "../../data";

export default async ({
  id,
  data,
}: {
  id?: string;
  data: { [key: string]: any };
}) => {
  const client = await _data.functions.client.create({ id, data });
  return client;
};
