import data from "../../data";

export default async ({ id }: { id?: string }) => {
  const client = await data.functions.client.find({ id });
  let format: { [key: string]: any } = {};

  if (client) {
    const config = await data.functions.config.find({ table: "client" });
    format = await data.functions.config.format(config as any, client.data);
  }

  return { value: client, format };
};
