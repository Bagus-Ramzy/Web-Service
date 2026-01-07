const express = require("express")
const router = express.Router()
const service = require("../services/targetService")
const auth = require("../middleware/authMiddleware")

// ======================
// MANAGER
// ======================
router.get("/", auth(["manajer"]), service.getAll)
router.post("/", auth(["manajer"]), service.create)
router.put("/:id", auth(["manajer"]), service.update)
router.delete("/:id", auth(["manajer"]), service.remove)

// ======================
// SALES
// ======================
router.get("/my-target", auth(), service.getMyTarget)

module.exports = router
