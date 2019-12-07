exports = module.exports = function (app, mongoose) {

  const { gql } = require('apollo-server-express');


  const typeDefs = gql`

  type Task 
  {
    _id: String
    description: String
    state:String
  }


  type TaskResponse
  {
    message: String
    success: Boolean
  }


  type Query {
    getTasks: [Task]
  }

  type Mutation {
    addTask(description:String!,state:String!): TaskResponse
    updateTask(_id:String!,description:String!,state:String!): TaskResponse
    deleteTask(_id:String!): TaskResponse
  }

`;

  app.graphql.typeDefs.push(typeDefs);

}
