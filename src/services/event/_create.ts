import _data from "../../data";

export default async ({
  id,
  data,
}: {
  id?: string;
  data: { [key: string]: any };
}) => {
  const event = await _data.functions.event.create({ id, data });
  return event;
};
