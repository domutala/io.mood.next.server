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
    error.message = "L'id de l'utilisateur n'est valide";
    throw error;
  }

  const next = await getMongoRepository(Next).findOne({
    where: { _id: { $eq: ObjectID(id) } },
  });

  if (!next) {
    const error = Error();
    error.name = "_employeeNotFound";
    throw error;
  }

  await next.remove();

  return next;
};
