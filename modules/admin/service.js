import Admin from '../../models/Admin.js'
import bcrypt from 'bcrypt'

export const create = async ({ email, password, firstName, lastName, roles }) => {
  const hash = await bcrypt.hash(password, 3)
  return await Admin.create({ email, password: hash, firstName, lastName, roles })
}

export const find = async () => {
  // await User.find({
  //   type: 'Admin'
  // })
  return await Admin.findOne()
}