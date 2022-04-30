import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";
import { Config } from "../../entities/Config";

/**
 * @author domutala
 */
export default async ({ id, table }: { id?: string; table?: string }) => {
  if (!table && !id) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  if (id && (typeof id !== "string" || id.length !== 24)) {
    const error = Error();
    error.name = "_invalidData";
    throw error;
  }

  const where: { [key: string]: any } = {};
  if (id) where._id = { $eq: ObjectID(id) };
  else if (table) where.table = { $eq: table };

  const config = await getMongoRepository(Config).findOne({ where });

  return config;
};
