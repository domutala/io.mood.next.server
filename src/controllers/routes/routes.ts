import * as express from "express";

import functions from "../functions";
import user from "./_user";
import file from "./_file";
import event from "./_event";

const router = express.Router();

router.post("/init-session", functions.init_session);

router.post("/login/email-and-password", functions.login.email_and_password);
router.post("/logout", functions.logout);

router.post("/forget-password/step-1", functions.forget_password.step_1);
router.post("/forget-password/step-2", functions.forget_password.step_2);
router.post("/forget-password/step-3", functions.forget_password.step_3);

router.use("/user", user);
router.use("/file", file);
router.use("/event", event);

export default router;
