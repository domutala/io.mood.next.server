import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";
import { Event } from "../../entities/Event";

/**
 * @author domutala
 */
export default async ({ id }: { id?: string }) => {
  if (id && (typeof id !== "string" || id.length !== 24)) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  const event = await getMongoRepository(Event).findOne({
    where: { _id: { $eq: ObjectID(id) } },
  });

  return event;
};
