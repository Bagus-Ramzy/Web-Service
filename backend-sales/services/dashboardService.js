const db = require("../db")

exports.managerDashboard = (req, res) => {
  const result = {}

  db.query("SELECT COUNT(*) total FROM users WHERE role_id = 3", (e, sales) => {
    result.sales = sales[0].total

    db.query("SELECT SUM(target) total FROM target_penjualan", (e2, target) => {
      result.target = target[0].total || 0

      db.query("SELECT COUNT(*) total FROM rencana_kunjungan", (e3, kunjungan) => {
        result.kunjungan = kunjungan[0].total
        res.json(result)
      })
    })
  })
}
