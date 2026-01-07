const express = require("express")
const router = express.Router()
const service = require("../services/pelangganService")
const auth = require("../middleware/authMiddleware")

// Sales & Manager boleh lihat
router.get("/", auth(), service.getAll)

// Sales input pelanggan
router.post("/", auth(["sales"]), service.create)

// Sales edit pelanggan
router.put("/:id", auth(["sales"]), service.update)

// Sales hapus pelanggan
router.delete("/:id", auth(["sales"]), service.remove)

module.exports = router
