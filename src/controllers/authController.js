const connectDb = require("../config/db");
const { getUserByEmailOrUsername } = require('../repositories/authRepository')

const login = async (req, res, next) => {
  const connection = connectDb()
  try {
    const { email, username, password } = req.body

    const getUser = await getUserByEmailOrUsername(email, username, password)

    if (getUser) {
      return res.status(200).send({ 'data': getUser })
    }

  } catch (error) {
    next(error)
  }
}

module.exports = { login }