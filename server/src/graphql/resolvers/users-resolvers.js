import Users from '../../models/Users'
import bcrypt from 'bcrypt'

export default {
  userLogin: async (root, { email, password }) => {
    const user = await Users.findOne({ email })

    if (!user) {
      throw new Error('Email não inválido.')
    }

    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
      throw Error('Senha inválida.')
    }

    return user
  },

  userSignin: async (root, { email, password, repassword }) => {
    const existingUser = await Users.findOne({ email })

    if (existingUser) {
      throw new Error('Email já cadastrado.')
    }

    if (password != repassword) {
      throw new Error('As senhas não são iguais.')
    }

    const hash = await bcrypt.hash(password, 10)
   
    await new Users({
      email: email,
      password: hash
    }).save()

    const user = await Users.findOne({ email })

    return user
  },

  getUsers: async () => {
    const users = await Users.find()

    if (!users) {
      throw new Error('Não existem usuários cadastrados.')
    }

    return users
  }
}