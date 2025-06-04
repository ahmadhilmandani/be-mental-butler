const connectDb = require("../config/db");
const jwt = require('jsonwebtoken')

const { getUserByEmailOrUsername, registerRepositories } = require('../repositories/authRepository')


const register = async (req, res, next) => {
  const connection = await connectDb();

  try {
    const { username, name, email, password } = req.body

    const result = await registerRepositories(username, name, email, password)

    await connection.commit()

    return res.status(201).send({ 'data': { 'inserted_id': result.insertId } })

  } catch (error) {
    await connection.rollback()
    next(error)
  }
}


const login = async (req, res, next) => {
  const connection = await connectDb();

  try {
    const { email_or_username, password } = req.body

    const getUser = await getUserByEmailOrUsername(email_or_username, password)

    if (getUser.length == 0) {
      return res.status(404).send({
        'is_error': true,
        'msg': 'Email atau Password Salah'
      })
    }

    const result = {
      username: getUser[0].username,
      name: getUser[0].name,
      email: getUser[0].email
    }

    const token = jwt.sign({ user: result }, "PASSWORD", { expiresIn: 86400 })

    if (getUser) {
      result['token'] = token
      return res.status(200).send({ 'data': result })
    }

  } catch (error) {
    await connection.rollback()
    next(error)
  }
}


module.exports = { login, register }