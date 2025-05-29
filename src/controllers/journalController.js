const connectDb = require('../config/db')
const { insertJournalRepo, getAllUserJournalRepo } = require('../repositories/journalRepository')


const insertJournalController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { userId } = req.params
    const { title, body } = req.body

    const result = await insertJournalRepo(userId, title, body)

    await connection.commit()

    return res.status(200).send(
      { 'data': { 'inserted_id': result.insertId } }
    );
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}


const getAllJournalController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { userId } = req.params

    const result = await getAllUserJournalRepo(userId)

    return res.status(200).send({
      'data': result
    })
  } catch (error) {
    next(error)
  }
}


const getJournalByIdController = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
}


const updateJournalController = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
}

const deleteJournalController = async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
}


module.exports = { insertJournalController, getAllJournalController, getJournalByIdController, updateJournalController, deleteJournalController }
