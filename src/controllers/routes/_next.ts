import * as express from "express";

import functions from "../functions";
import middlewares from "./middlewares";

const router = express.Router();

router.post("/create", [middlewares.is_login], functions.next.create);

router.get("/get", functions.next.get);
router.get("/list", functions.next.list);

export default router;
