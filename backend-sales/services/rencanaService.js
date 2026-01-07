const db = require("../db");

/* =======================
   MANAGER - LIHAT SEMUA
======================= */
exports.getAll = (req, res) => {
  db.query(
    `
    SELECT 
      rk.id,
      u.username AS sales,
      p.nama_pelanggan,
      pr.nama_produk,
      rk.jumlah,
      rk.harga_asli,
      rk.harga_penawaran,
      rk.tanggal_kunjungan,
      rk.status
    FROM rencana_kunjungan rk
    JOIN users u ON rk.user_id = u.id
    JOIN pelanggan p ON rk.pelanggan_id = p.id
    JOIN produk pr ON rk.id_produk = pr.id_produk
    ORDER BY rk.tanggal_kunjungan DESC
    `,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
};

/* =======================
   SALES - LIHAT SENDIRI
======================= */
exports.getMy = (req, res) => {
  const userId = req.user.user_id;

  db.query(
    `
    SELECT 
      rk.id,
      p.nama_pelanggan,
      pr.nama_produk,
      rk.jumlah,
      rk.harga_asli,
      rk.harga_penawaran,
      rk.tanggal_kunjungan,
      rk.status,
      rk.tujuan,
      rk.pelanggan_id,
      rk.id_produk
    FROM rencana_kunjungan rk
    JOIN pelanggan p ON rk.pelanggan_id = p.id
    JOIN produk pr ON rk.id_produk = pr.id_produk
    WHERE rk.user_id = ?
    ORDER BY rk.tanggal_kunjungan DESC
    `,
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(result);
    }
  );
};

/* =======================
   SALES - CREATE
======================= */
exports.create = (req, res) => {
  const user_id = req.user.user_id;
  const {
    pelanggan_id,
    id_produk,
    jumlah,
    harga_asli,
    harga_penawaran,
    tanggal_kunjungan,
    tujuan,
  } = req.body;

  db.query(
    `
    INSERT INTO rencana_kunjungan
    (user_id, pelanggan_id, id_produk, jumlah, harga_asli, harga_penawaran, tanggal_kunjungan, tujuan)
    VALUES (?,?,?,?,?,?,?,?)
    `,
    [
      user_id,
      pelanggan_id,
      id_produk,
      jumlah,
      harga_asli,
      harga_penawaran,
      tanggal_kunjungan,
      tujuan,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ inserted: result.insertId });
    }
  );
};

/* =======================
   SALES - UPDATE
======================= */
exports.update = (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.params;

  const {
    pelanggan_id,
    id_produk,
    jumlah,
    harga_asli,
    harga_penawaran,
    tanggal_kunjungan,
    tujuan,
  } = req.body;

  db.query(
    `
    UPDATE rencana_kunjungan SET
      pelanggan_id = ?,
      id_produk = ?,
      jumlah = ?,
      harga_asli = ?,
      harga_penawaran = ?,
      tanggal_kunjungan = ?,
      tujuan = ?
    WHERE id = ? AND user_id = ?
    `,
    [
      pelanggan_id,
      id_produk,
      jumlah,
      harga_asli,
      harga_penawaran,
      tanggal_kunjungan,
      tujuan,
      id,
      user_id,
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ message: "Rencana berhasil diupdate" });
    }
  );
};

/* =======================
   SALES - DELETE
======================= */
exports.remove = (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.params;

  db.query(
    `
    DELETE FROM rencana_kunjungan
    WHERE id = ? AND user_id = ?
    `,
    [id, user_id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ message: "Rencana berhasil dihapus" });
    }
  );
};
