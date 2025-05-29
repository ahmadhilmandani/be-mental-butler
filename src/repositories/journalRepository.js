const connectDb = require('../config/db')

const insertJournalRepo = async (user_id, title, body) => {
  const connection = await connectDb()

  try {
    const sql_statement = `
      INSERT INTO
        journals
        (
          user_id,
          title,
          body
        )
      VALUES
        (
          ?,
          ?,
          ?
        )
    `

    const [result] = await connection.execute(sql_statement, [user_id, title, body])
    return result

  } catch (error) {
    throw new Error(error)
  }
}


const getAllUserJournalRepo = async (userId) => {
  const connection = await connectDb()

  try {
    const sql_statement = `
      SELECT
        u.username, u.name, j.title, j.body, j.issue_clasification, id.description
      FROM
        users AS u
      INNER JOIN
        journals AS j
        ON u.id_user = j.user_id
      LEFT JOIN
        issue_details AS id
        ON j.id_journal = id.journal_id
      WHERE
        u.id_user = ?
    `

    const [result] = await connection.execute(sql_statement, [userId])

    return result

  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { insertJournalRepo, getAllUserJournalRepo }