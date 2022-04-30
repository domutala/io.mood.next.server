import * as express from "express";

import functions from "../functions";
import middlewares from "./middlewares";

const router = express.Router();

router.post("/create", [middlewares.is_login], functions.event.create);

router.get("/get", functions.event.get);
router.get("/list", functions.event.list);

export default router;
