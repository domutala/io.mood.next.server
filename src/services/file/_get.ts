import data from "../../data";

export default async ({ id }: { id: string }) => {
  const file = await data.functions.file.find({ id });
  return file;
};
