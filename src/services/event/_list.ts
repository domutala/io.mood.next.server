import data from "../../data";

export default async ({
  access,
  value,
}: {
  access?: string;
  value?: string;
}) => {
  const employees = await data.functions.event.list({ access, value });
  return employees;
};
