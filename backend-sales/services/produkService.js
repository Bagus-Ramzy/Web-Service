const db = require("../db")

/* =========================
   GET ALL PRODUK
   ========================= */
exports.getAll = (req, res) => {
  db.query(
    `
    SELECT 
      id_produk,
      nama_produk,
      kategori_produk,
      deskripsi_produk,
      jenis_produk,
      merk,
      stok,
      harga_satuan
    FROM produk
    ORDER BY nama_produk
    `,
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json(result)
    }
  )
}

/* =========================
   CREATE PRODUK
   ========================= */
exports.create = (req, res) => {
  const {
    id_produk,
    nama_produk,
    kategori_produk,
    deskripsi_produk,
    jenis_produk,
    merk,
    stok,
    harga_satuan,
  } = req.body

  db.query(
    `
    INSERT INTO produk (
      id_produk,
      nama_produk,
      kategori_produk,
      deskripsi_produk,
      jenis_produk,
      merk,
      stok,
      harga_satuan
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      id_produk,
      nama_produk,
      kategori_produk,
      deskripsi_produk || null,
      jenis_produk || null,
      merk || null,
      stok,
      harga_satuan,
    ],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json(err)
      }
      res.json({ message: "Produk berhasil ditambahkan" })
    }
  )
}

/* =========================
   UPDATE PRODUK
   ========================= */
exports.update = (req, res) => {
  const { id } = req.params
  const {
    nama_produk,
    kategori_produk,
    deskripsi_produk,
    jenis_produk,
    merk,
    stok,
    harga_satuan,
  } = req.body

  db.query(
    `
    UPDATE produk SET
      nama_produk = ?,
      kategori_produk = ?,
      deskripsi_produk = ?,
      jenis_produk = ?,
      merk = ?,
      stok = ?,
      harga_satuan = ?
    WHERE id_produk = ?
    `,
    [
      nama_produk,
      kategori_produk,
      deskripsi_produk,
      jenis_produk,
      merk,
      stok,
      harga_satuan,
      id,
    ],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json(err)
      }
      res.json({ message: "Produk berhasil diupdate" })
    }
  )
}

/* =========================
   DELETE PRODUK
   ========================= */
exports.remove = (req, res) => {
  const { id } = req.params

  db.query(
    `DELETE FROM produk WHERE id_produk = ?`,
    [id],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json(err)
      }
      res.json({ message: "Produk berhasil dihapus" })
    }
  )
}
