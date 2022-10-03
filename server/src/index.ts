import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { LocationsAPI } from "./graphql/gateway";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      locationsAPI: new LocationsAPI(),
    };
  },
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`Server listening at ${url}`);
});
