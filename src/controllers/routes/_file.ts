import * as express from "express";

import functions from "../functions";
import middlewares from "./middlewares";

const router = express.Router();

router.post("/add", [middlewares.is_login], functions.file.add);

router.get("/stream", functions.file.stream);
router.get("/get", functions.file.get);

export default router;
