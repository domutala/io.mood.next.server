import * as express from "express";
import functions from "../../functions";

const router = express.Router();

router.post("/add", functions.file.add);
router.get("/get", functions.file.get);

export default router;
