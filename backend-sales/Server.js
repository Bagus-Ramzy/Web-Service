require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

/* ========================
   GLOBAL MIDDLEWARE
   ======================== */
app.use(cors())
app.use(express.json()) // ganti body-parser (lebih modern)

/* ========================
   ROUTES
   ======================== */
app.use("/auth", require("./routes/authRoute"))
app.use("/dashboard", require("./routes/dashboardRoute"))

app.use("/target", require("./routes/targetRoute"))
app.use("/rencana", require("./routes/rencanaRoute"))

app.use("/pelanggan", require("./routes/pelangganRoute"))
app.use("/produk", require("./routes/produkRoute"))

/* ========================
   ROOT CHECK
   ======================== */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend Sales Management System API Running 🚀",
  })
})

/* ========================
   404 HANDLER
   ======================== */
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" })
})

/* ========================
   RUN SERVER
   ======================== */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`API Ready at http://localhost:${PORT}`)
})
