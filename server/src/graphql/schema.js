export default `
  type Users {
    _id: String
    email: String
    password: String
  }

  type Auth {
    userLogin(email: String!, password: String!): Users,
    userSignin(email: String!, password: String!, repassword: String!): Users,
    getUsers: [Users]
  }

  schema {
    query: Auth
  }
`