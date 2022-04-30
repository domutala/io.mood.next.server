import { getMongoRepository } from "typeorm";
import { Client } from "../../entities/Client";

/**
 * @author domutala
 * @version 0.2.0
 */
export default async ({
  value,
  access,
}: {
  value?: string;
  access?: string;
}) => {
  let employees: string[] = [];
  const aggreagate: any[] = [];

  const $match: any = {};
  const $and: any[] = [];
  const $or: any[] = [];

  if (value) {
    $or.push({ "profil.2a": new RegExp(value, "gim") });
    $or.push({ "profil.2b": new RegExp(value, "gim") });
  }

  if (access) $and.push({ [`access.${access}`]: { $eq: true } });

  if ($and.length) $match.$and = $and;
  if ($or.length) $match.$or = $or;

  aggreagate.push(
    ...[
      { $match },
      { $sort: { "profil.firstname": 1, "profil.lastname": 1 } },
      {
        $group: { _id: null, array: { $push: { $toString: "$_id" } } },
      },
      {
        $project: { array: true, _id: false },
      },
    ]
  );

  const a = await getMongoRepository(Client).aggregate(aggreagate).toArray();
  if (a.length && a[0].array) employees = a[0].array;

  return employees;
};
