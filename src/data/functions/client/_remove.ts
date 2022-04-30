import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";
import { Client } from "../../entities/Client";

/**
 * @author domutala
 */
export default async ({ id }: { id?: string }) => {
  if (id && (typeof id !== "string" || id.length !== 24)) {
    const error = Error();
    error.name = "_invalidData";
    error.message = "L'id de l'utilisateur n'est valide";
    throw error;
  }

  const client = await getMongoRepository(Client).findOne({
    where: { _id: { $eq: ObjectID(id) } },
  });

  if (!client) {
    const error = Error();
    error.name = "_employeeNotFound";
    throw error;
  }

  await client.remove();

  return client;
};
