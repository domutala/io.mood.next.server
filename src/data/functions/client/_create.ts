import { Client } from "../../entities/Client";
import functions from "..";

/**
 * @author domutala
 * @description ajouter un nouvel client
 */
export default async ({
  id,
  data,
}: {
  id?: string;
  data: { [key: string]: any };
}) => {
  const config = await functions.config.find({ table: "client" });
  if (!config) {
    const error = Error();
    error.name = "_configNotFound";
    throw error;
  }

  await functions.config.test(config.keys, data);

  let client: Client | undefined;

  if (id) {
    client = await functions.client.find({ id });
  }

  if (!client) {
    client = new Client();
    client.data = { global: true, group: true, leave: true };
  }

  for (const key of Object.keys(data)) {
    client.data[key] = data[key];
  }

  await client.save();

  return client;
};
