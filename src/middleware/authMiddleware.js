const jwt = require('jsonwebtoken');
const connectDb = require('../config/db');



const checkToken = async (req, res, next) => {
  const connection = await connectDb();

  try {
    const token = req.headers['authorization']
    if (!token) {
      return res.status(401).send({
        'is_error': true,
        'msg': "Silahkan Login Terlebih Dahulu!",
      })
    }

    const decodeToken = jwt.verify(token.replace('Bearer ', ''), "PASSWORD")

    const sql_statement = `
      SELECT
        *
      FROM
        users
      WHERE
        email = ?
      OR
        username = ?
      LIMIT 1
    `

    const [result] = await connection.execute(sql_statement, [decodeToken.user.email, decodeToken.user.username])

    if (result.length == 0) {
      return res.status(400).send({
        'is_error': true,
        'msg': 'Pengguna Ini Tidak Tersedia',
      })
    }

    // res.user = result
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { checkToken }