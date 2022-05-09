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

export const findById = async id => {
  return await Admin.findById(id)
}

export const sum = (x, y) => {
  return x + y
}

export const isEven = x => {
  return x % 2 === 0
}

export const fullName = arr => {
  if (!arr || !Array.isArray(arr)) {
    throw new Error('invalid argument')
  }
  return arr
    .filter(Boolean)
    .join(' ')
}