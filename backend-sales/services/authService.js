const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username dan password wajib diisi" });
  }

  const sql = `
    SELECT users.id, users.username, users.password, roles.role_name
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE users.username = ?
  `;

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    const user = result[0];

    // cocokkan password bcrypt
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ msg: "Password salah" });
    }

    // generate JWT
    const token = jwt.sign(
      {
        user_id: user.id,
        role: user.role_name.toLowerCase(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role_name.toLowerCase(),
      user_id: user.id,
    });
  });
};
