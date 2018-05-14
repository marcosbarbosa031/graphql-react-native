import UserResolver from './users-resolvers'

export default {
  Auth: {
    userLogin: UserResolver.userLogin,
    getUsers: UserResolver.getUsers,
    userSignin: UserResolver.userSignin
  }
}