const express = require('express');
const router = express.Router();

const controller = require("../controller/detail.controller")

router.post("/add-detail", controller.addDetail)
router.get("/fetch-single-detail/:id", controller.fetchSingleDetail)
router.get("/fetch-details", controller.fetchDetails) //all details
router.put('/update-detail', controller.updateDetail)

module.exports=router;