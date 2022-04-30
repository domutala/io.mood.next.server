import * as express from "express";
import middlewares from "./middlewares";
import user from "./_user";
import file from "./_file";
import client from "./client";

import admin from "./_admin";

const router = express.Router();

router.use(middlewares);

router.use("/user", user);
router.use("/file", file);
router.use("/client", client);
router.use("/admin", admin);

export default router;
