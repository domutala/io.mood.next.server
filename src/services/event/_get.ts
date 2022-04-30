import data from "../../data";

export default async ({ id }: { id?: string }) => {
  const event = await data.functions.event.find({ id });
  let format: { [key: string]: any } = {};

  if (event) {
    const config = await data.functions.config.find({ table: "event" });
    format = await data.functions.config.format(config as any, event.data);

    return { value: event, format };
  }

  return null;
};
