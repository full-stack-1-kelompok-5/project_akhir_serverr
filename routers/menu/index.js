const MenuController = require("../../controller/menuController");
const router = require("express").Router()

router.get("/Read", MenuController.ReadMenu);
router.post("/Create", MenuController.CreateMenu);
router.put("/Update/:id", MenuController.UpdateMenu);
router.delete("/Delete/:id", MenuController.DeleteMenu);

module.exports = router;