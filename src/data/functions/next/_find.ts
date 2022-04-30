import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";
import { Next } from "../../entities/Next";

/**
 * @author domutala
 */
export default async ({ id }: { id?: string }) => {
  if (id && (typeof id !== "string" || id.length !== 24)) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  const next = await getMongoRepository(Next).findOne({
    where: { _id: { $eq: ObjectID(id) } },
  });

  return next;
};
