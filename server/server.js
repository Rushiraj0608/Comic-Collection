import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';

import { ComicAPI } from './resolvers.js';
import {typeDefs} from './typeDefs.js';
import {resolvers} from './resolvers.js';
import { createClient } from 'redis';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

const {url} = await startStandaloneServer(server, {
  context: async () => {
    const { cache } = server;
   return {
     dataSources: {
      comicAPI: new ComicAPI({ cache })
     },
   };
 },
  listen: {port: 4000}
});

console.log(`🚀  Server ready at: ${url}`);
