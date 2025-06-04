const connectDb = require('../config/db')
const bcrypt = require('bcrypt')

const registerRepositories = async (username, name, email, password) => {
  const connection = await connectDb()
  const currentDatetime = new Date()

  try {
    const saltRounds = 10

    const sql_statement = `
      INSERT INTO
        users
        (
          username,
          name, 
          email, 
          password,
          created_at
        )
      VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?
        )
    `

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    if (hashedPassword) {
      const [result] = await connection.execute(sql_statement, [username, name, email, hashedPassword, currentDatetime])

      return result
    }

  } catch (error) {
    throw new Error(error)
  }
}

const getUserByEmailOrUsername = async (emailOrUsername, password) => {
  const connection = await connectDb()

  try {
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

    const [result] = await connection.execute(sql_statement, [emailOrUsername, emailOrUsername])

    if (result.length == 0) {
      return []
    }

    const match = await bcrypt.compare(password, result[0].password);


    if (match) {
      return result
    }

  } catch (error) {
    throw new Error(error)
  }

}

module.exports = { getUserByEmailOrUsername, registerRepositories }