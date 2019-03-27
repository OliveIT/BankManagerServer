const { ApolloServer, gql } = require('apollo-server');

let bankItems = [];

// The GraphQL schema
const typeDefs = gql`
  input BankItemInput {
    id: String
    account: String
    employee: String
    bank: String
    branch: String
    accType: String
    accNumber: String
    empNumber: String
    lastUpdate: String
  }
  type BankItem {
    id: String
    account: String
    employee: String
    bank: String
    branch: String
    accType: String
    accNumber: String
    empNumber: String
    lastUpdate: String
  }
  type Query {
    "Fetch all bank items!"
    bankItems: [BankItem]
  }
  type Mutation {
    createItem(row: BankItemInput): BankItem
    updateItem(row: BankItemInput): BankItem
    deleteItem(rowKeys: [String]): Int
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    bankItems: () => {
      return bankItems;
    },
  },
  Mutation: {
    createItem: (parent, {row}) => {
      bankItems.push(row);
      return row;
    },
    updateItem: (parent, {row}) => {
      for (var i = 0; i < bankItems.length; i ++)
        if (bankItems [i].id == row.id) {
          bankItems [i] = row;
          break;
        }
      return row;
    },
    deleteItem: (parent, {rowKeys}) => {
      for (var i = bankItems.length - 1; i >= 0; i --)
        for (var j = 0; j < rowKeys.length; j ++)
          if (bankItems [i].id == rowKeys [j]) {
            delete bankItems [i];
            break;
          }
      return rowKeys.length;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});