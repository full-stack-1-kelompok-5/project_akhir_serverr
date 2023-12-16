const WaitersController = require("../../controller/waitersController");
const router = require("express").Router()

router.post("/Register", WaitersController.registerWaiters);
router.post("/Login", WaitersController.LoginWaiters);

module.exports = router;

