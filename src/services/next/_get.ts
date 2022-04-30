import data from "../../data";

export default async ({ id }: { id?: string }) => {
  const next = await data.functions.next.find({ id });
  let format: { [key: string]: any } = {};

  if (next) {
    const config = await data.functions.config.find({ table: "next" });
    format = await data.functions.config.format(config as any, next.data);

    return { value: next, format };
  }

  return null;
};
