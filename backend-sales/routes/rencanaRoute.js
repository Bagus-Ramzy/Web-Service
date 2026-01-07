const express = require("express");
const router = express.Router();
const service = require("../services/rencanaService");
const auth = require("../middleware/authMiddleware");

// =======================
// SALES
// =======================

// lihat rencana kunjungan milik sendiri
router.get("/my", auth(["sales"]), service.getMy);
router.post("/", auth(["sales"]), service.create);
router.put("/:id", auth(["sales"]), service.update);
router.delete("/:id", auth(["sales"]), service.remove);

// =======================
// MANAGER
// =======================

// monitoring semua kunjungan
router.get("/", auth(["manajer"]), service.getAll);

module.exports = router;
