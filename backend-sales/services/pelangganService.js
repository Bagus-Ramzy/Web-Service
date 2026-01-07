const db = require("../db")

// =======================
// GET ALL PELANGGAN
// =======================
exports.getAll = (req, res) => {
  db.query(
    "SELECT id, nama_pelanggan, alamat, no_telp FROM pelanggan ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json(result)
    }
  )
}

// =======================
// CREATE PELANGGAN
// =======================
exports.create = (req, res) => {
  const { nama_pelanggan, alamat, no_telp } = req.body

  if (!nama_pelanggan) {
    return res.status(400).json({ msg: "Nama pelanggan wajib diisi" })
  }

  db.query(
    "INSERT INTO pelanggan (nama_pelanggan, alamat, no_telp) VALUES (?,?,?)",
    [nama_pelanggan, alamat, no_telp],
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json({ msg: "Pelanggan ditambahkan", id: result.insertId })
    }
  )
}

// =======================
// UPDATE PELANGGAN
// =======================
exports.update = (req, res) => {
  const { id } = req.params
  const { nama_pelanggan, alamat, no_telp } = req.body

  db.query(
    `
    UPDATE pelanggan SET
      nama_pelanggan = ?,
      alamat = ?,
      no_telp = ?
    WHERE id = ?
    `,
    [nama_pelanggan, alamat, no_telp, id],
    (err) => {
      if (err) return res.status(500).json(err)
      res.json({ msg: "Pelanggan berhasil diupdate" })
    }
  )
}

// =======================
// DELETE PELANGGAN
// =======================
exports.remove = (req, res) => {
  const { id } = req.params

  db.query(
    "DELETE FROM pelanggan WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err)
      res.json({ msg: "Pelanggan berhasil dihapus" })
    }
  )
}
