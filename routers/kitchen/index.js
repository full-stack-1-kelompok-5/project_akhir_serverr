const KitchenController = require("../../controller/kitchenController");
const router = require("express").Router()

router.post("/", KitchenController.RegisterKitchen);
router.post("/Login", KitchenController.LoginKitchen);

module.exports = router;

