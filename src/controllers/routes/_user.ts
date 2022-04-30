import * as express from "express";
import functions from "../functions";

const router = express.Router();

router.post("/update", functions.user.update);
router.post("/password", functions.user.password);

router.get("/get", functions.user.get);

export default router;
