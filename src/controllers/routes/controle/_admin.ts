import * as express from "express";
import { is_admin } from "./middlewares";
import functions from "../../functions";

const router = express.Router();

router.post("/user/add", is_admin(), functions.admin.add);
router.post("/user/remove", is_admin(), functions.admin.remove);
router.post("/user/blocked", is_admin(), functions.admin.blocked);

export default router;
