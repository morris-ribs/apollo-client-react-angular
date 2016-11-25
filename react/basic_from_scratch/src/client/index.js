import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import { ApolloProvider } from 'react-apollo';
import routes from './routes/routes';


// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ 
      uri: 'http://localhost:8080/',
      opts: {
              credentials: 'same-origin'
          } 
    }),
});

render(
  <ApolloProvider client={client}>
    <Router history={browserHistory} routes={routes} />
  </ApolloProvider>,
  document.getElementById('app')
);