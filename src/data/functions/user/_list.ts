import { getMongoRepository } from "typeorm";
import { User } from "../../entities/User";

/**
 * @author domutala
 * @version 0.2.0
 */
export default async () => {
  let users: string[] = [];

  const aggreagate: any[] = [];
  aggreagate.push(
    ...[
      { $sort: { "data.name": 1 } },
      {
        $group: { _id: null, array: { $push: { $toString: "$_id" } } },
      },
      {
        $project: { array: true, _id: false },
      },
    ]
  );

  const a = await getMongoRepository(User).aggregate(aggreagate).toArray();
  if (a.length && a[0].array) users = a[0].array;

  return users;
};
