const AdminController = require("../../controller/adminController");
const router = require("express").Router()

router.post("/Register", AdminController.registerAdmin);
router.post("/Login", AdminController.LoginAdmin);

module.exports = router;