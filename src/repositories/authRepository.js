const connectDb = require('../config/db')

const getUserByEmailOrUsername = async (email, username, password) => {
  const connection = await connectDb()

  try {
    sql_statement = `
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

    const result = await connection.execute(sql_statement, [email, username])

    return result[0]

  } catch (error) {
    throw new Error(error)
  }

}

module.exports = { getUserByEmailOrUsername }