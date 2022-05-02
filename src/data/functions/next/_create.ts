import { Next } from "../../entities/Next";
import { User } from "../../entities/User";
import functions from "..";

/**
 * @author domutala
 * @description ajouter un nouvel next
 */
export default async ({
  id,
  data,
  user,
}: {
  id?: string;
  data: { [key: string]: any };
  user: User;
}) => {
  const config = await functions.config.find({ table: "next" });
  if (!config) {
    const error = Error();
    error.name = "_configNotFound";
    throw error;
  }

  await functions.config.test(config.keys, data);

  let next: Next | undefined;

  if (id) {
    next = await functions.next.find({ id });
  }

  if (!next) {
    next = new Next();
    next.data = { date: new Date(), files: [] };
  }

  for (const key of Object.keys(data)) {
    next.data[key as "date"] = data[key];
  }

  next.user = user.id.toString();
  await next.save();

  return next;
};
