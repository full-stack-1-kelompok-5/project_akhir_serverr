const OrderController = require("../../controller/orderController");
const router = require("express").Router()

router.get("/Read", OrderController.ReadOrder);
router.post("/Create", OrderController.CreateOrder);
router.put("/Update/:id", OrderController.UpdateOrder);
router.delete("/Delete/:id", OrderController.DeleteOrder);

module.exports = router;