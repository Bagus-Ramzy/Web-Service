const express = require("express")
const router = express.Router()
const auth = require("../middleware/authMiddleware")
const service = require("../services/dashboardService")

router.get("/manager", auth(["Manager"]), service.managerDashboard)

module.exports = router
