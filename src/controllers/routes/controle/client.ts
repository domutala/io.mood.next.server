import * as express from "express";
import functions from "../../functions";

const router = express.Router();

router.post("/create", functions.client.create);

router.get("/get", functions.client.get);
router.get("/list", functions.client.list);

export default router;
