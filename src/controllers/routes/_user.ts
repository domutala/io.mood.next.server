import * as express from "express";
import functions from "../functions";
import middlewares from "./middlewares";

const router = express.Router();

router.post("/update", [middlewares.is_login], functions.user.update);
router.post("/password", [middlewares.is_login], functions.user.password);

router.get("/get", functions.user.get);

export default router;
