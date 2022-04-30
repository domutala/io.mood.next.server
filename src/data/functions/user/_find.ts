import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";

import { User } from "../../entities/User";

/**
 * Trouver un utilisateur
 * @author domutala
 * @version 0.2.0
 */
export default async ({
  id,
  mail,
  username,
  phone,
}: {
  id?: string;
  mail?: string;
  username?: string;
  phone?: string;
}) => {
  if (!id && !mail) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  // vérifier si les données sont correctes
  if (id && (typeof id !== "string" || id.length !== 24)) {
    const error = Error();
    error.name = "_invalidData";
    error.message = "L'id de l'utilisateur n'est valide";
    throw error;
  }

  const where: any = { $or: [] };
  if (id) where.$or.push({ _id: { $eq: ObjectID(id) } });
  if (phone) where.$or.push({ "data.phone": { $eq: phone } });
  if (mail) where.$or.push({ "data.mail": { $eq: mail } });
  if (username) where.$or.push({ "data.username": { $eq: username } });

  const user = await getMongoRepository(User).findOne({ where });

  return user;
};
