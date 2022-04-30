import { Session } from "../../data/entities/Session";
import data from "../../data";

export default async ({ session }: { session?: Session }) => {
  if (session) {
    await data.functions.session.update({
      id: session.id.toString(),
      expired: true,
    });
  }

  return true;
};
