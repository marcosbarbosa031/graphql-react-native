/* eslint-disable no-console */

import express from 'express'
import bodyParse from 'body-parser'
import { createServer } from 'http'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import constants from './config/constants'
import './config/db'

const app = express()
const PORT = constants.PORT
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use(bodyParse.json())
app.use('/graphiql', graphiqlExpress({
  endpointURL: constants.GRAPHQL_PATH
}))

app.use(constants.GRAPHQL_PATH, graphqlExpress({
  schema
}))

const graphqlServer = createServer(app)

graphqlServer.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`App listen to port: ${PORT}`)
  }
})
