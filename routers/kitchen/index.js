const KitchenController = require("../../controller/kitchenController");
const router = require("express").Router()

router.post("/", KitchenController.registerKitchen);
router.post("/Login", KitchenController.LoginKitchen);

module.exports = router;

