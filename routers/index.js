const router = require("express").Router()
const adminRouter = require("./admin/index");
const waitersRouter = require("./waiters/index");
const kitchenRouter = require("./kitchen/index");
const menuRouter = require("./menu/index");
const orderRouter = require("./order/index");
const orderDetailRouter = require("./orderDetail/index");

router.use("/Admin", adminRouter);
router.use("/Waiters", waitersRouter);
router.use("/Kitchen", kitchenRouter);
router.use("/Menu", menuRouter);
router.use("/Order", orderRouter);
router.use("/OrderDetail", orderDetailRouter);


module.exports = router;

