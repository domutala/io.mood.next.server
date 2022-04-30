import { Event } from "../../entities/Event";
import functions from "..";

/**
 * @author domutala
 * @description ajouter un nouvel event
 */
export default async ({
  id,
  data,
}: {
  id?: string;
  data: { [key: string]: any };
}) => {
  const config = await functions.config.find({ table: "event" });
  if (!config) {
    const error = Error();
    error.name = "_configNotFound";
    throw error;
  }

  await functions.config.test(config.keys, data);

  let event: Event | undefined;

  if (id) {
    event = await functions.event.find({ id });
  }

  if (!event) {
    event = new Event();
    event.data = { date: new Date(), photos: [] };
  }

  for (const key of Object.keys(data)) {
    event.data[key as "date"] = data[key];
  }

  await event.save();

  return event;
};
