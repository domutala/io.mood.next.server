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
    throw error;
  }

  const client = await getMongoRepository(Client).findOne({
    where: { _id: { $eq: ObjectID(id) } },
  });

  return client;
};
