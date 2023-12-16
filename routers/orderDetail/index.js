const OrderDetailController = require("../../controller/orderDetailController");
const router = require("express").Router()

router.get("/Read", OrderDetailController.ReadOrderDetail);
router.put("/Update/:id", OrderDetailController.UpdateOrderDetail);
router.delete("/Delete/:id", OrderDetailController.DeleteOrderDetail);
router.post("/Create", OrderDetailController.CreateOrderDetail);

module.exports = router;