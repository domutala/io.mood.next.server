import * as express from "express";

import middlewares from "./middlewares";
import routes from "./_routes";

export const init = async (App: express.Express) => {
  const router = express.Router();

  router.use(middlewares.decrypt_headers);
  router.use(middlewares.decrypt_body);
  router.use(middlewares.decrypt_query);
  router.use(middlewares.jwt);

  router.use(routes);

  App.use(router);
};
