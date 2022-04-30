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
    error.message = "L'id de l'utilisateur n'est valide";
    throw error;
  }

  const event = await getMongoRepository(Event).findOne({
    where: { _id: { $eq: ObjectID(id) } },
  });

  if (!event) {
    const error = Error();
    error.name = "_employeeNotFound";
    throw error;
  }

  await event.remove();

  return event;
};
