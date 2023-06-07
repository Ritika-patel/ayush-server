const express = require("express");
const router = express.Router();

const controller = require("../controller/auth.controller")

router.post("/login-user", controller.loginUser);
router.post("/register-user", controller.registerUser);
router.get("/user-list", controller.getUsers);
router.delete("/delete-user/:id", controller.DeleteUser);

module.exports=router;