import firebase_admin from "firebase-admin";
import data from "../../../data";
import { ISession } from "../../../../types/express-extend";

export default async ({
  session,
  firebase_id_token,
}: {
  session: ISession;
  firebase_id_token: string;
}) => {
  const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG as string);

  if (!firebase_admin.apps.length) {
    firebase_admin.initializeApp({
      credential: firebase_admin.credential.cert(serviceAccount),
    });
  }

  const verify_token = await firebase_admin
    .auth()
    .verifyIdToken(firebase_id_token);

  if (!verify_token) throw { text: "firebaseTokenError" };

  const body = await firebase_admin.auth().getUser(verify_token.uid);
  if (!body.email) throw { text: "emailIsRequired" };

  let user = await data.functions.user.find({
    mail: body.email,
    uid: body.uid,
  });

  if (!user) {
    user = await data.functions.user.add({
      mail: body.email,
      name: body.displayName as string,
    });

    // user = await data.functions.user.update({
    //   id: user.id.toString(),
    //   data: {
    //     phone: body.phoneNumber,
    //   },
    // });
  }

  await data.functions.session.update({
    id: session.id.toString(),
    user_id: user.id.toString(),
  });

  session.user = user.id.toString();
  session._user = user;

  return session;
};
