const db = require("../db")

/* ======================
   MANAGER
====================== */

// ambil semua target
exports.getAll = (req, res) => {
  db.query(
    `
    SELECT 
      t.id,
      u.username AS sales,
      t.user_id,
      t.tahun,
      t.target
    FROM target_penjualan t
    JOIN users u ON t.user_id = u.id
    ORDER BY t.tahun DESC
    `,
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ msg: "Gagal ambil data" })
      }
      res.json(result)
    }
  )
}

// tambah target
exports.create = (req, res) => {
  const { user_id, tahun, target } = req.body

  db.query(
    "INSERT INTO target_penjualan (user_id, tahun, target) VALUES (?,?,?)",
    [user_id, tahun, target],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ msg: "Gagal menyimpan data" })
      }
      res.json({ msg: "Berhasil tambah target" })
    }
  )
}

// update target
exports.update = (req, res) => {
  const { id } = req.params
  const { user_id, tahun, target } = req.body

  db.query(
    `
    UPDATE target_penjualan 
    SET user_id = ?, tahun = ?, target = ?
    WHERE id = ?
    `,
    [user_id, tahun, target, id],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ msg: "Gagal update data" })
      }
      res.json({ msg: "Berhasil update target" })
    }
  )
}

// hapus target
exports.remove = (req, res) => {
  const { id } = req.params

  db.query(
    "DELETE FROM target_penjualan WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ msg: "Gagal hapus data" })
      }
      res.json({ msg: "Berhasil hapus target" })
    }
  )
}

/* ======================
   SALES
====================== */

exports.getMyTarget = (req, res) => {
  const userId = req.user.user_id

  db.query(
    `
    SELECT target, tahun
    FROM target_penjualan
    WHERE user_id = ?
    ORDER BY tahun DESC
    LIMIT 1
    `,
    [userId],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ msg: "Gagal ambil target" })
      }

      res.json({
        target: result.length ? result[0].target : 0,
        tahun: result.length ? result[0].tahun : "-"
      })
    }
  )
}
