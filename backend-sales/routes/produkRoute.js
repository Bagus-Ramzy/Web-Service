const express = require("express")
const router = express.Router()
const service = require("../services/produkService")
const auth = require("../middleware/authMiddleware")

// Semua role boleh lihat produk
router.get("/", auth(), service.getAll)
router.post("/", auth("manajer"), service.create)
router.put("/:id", auth("manajer"), service.update)
router.delete("/:id", auth("manajer"), service.remove)

module.exports = router
