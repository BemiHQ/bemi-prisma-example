import { ApolloServer } from '@apollo/server';
import { BemiApolloServerPlugin } from '@bemi-db/prisma';

import { prisma } from "./prisma";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Todo {
    id: ID!
    task: String!
    isCompleted: Boolean!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(task: String!): Todo
  }
`;

const resolvers = {
  Query: {
    todos: async () => {
      const todos = await prisma.todo.findMany();
      return todos;
    },
  },
  Mutation: {
    addTodo: async (_: any, { task }: { task: string }) => {
      const todo = await prisma.todo.create({ data: { task, isCompleted: false } });
      return todo;
    }
  },
};

// http://localhost:4001/graphql
//
// query TodosQuery {
//   todos {
//     id
//   }
// }

// mutation AddTodo($task: String!) {
//   addTodo(task: $task) {
//     id
//     task
//     isCompleted
//   }
// }
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    BemiApolloServerPlugin(({ request, contextValue }: any) => ({
      userId: contextValue.userId,
      operationName: request.operationName,
      variables: request.variables,
      endpoint: request.http.headers.get('origin'),
    })),
  ],
});
