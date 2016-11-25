//
// This is the client side entry point for the React app.
//

import React from "react";
import {render} from "react-dom";
import {routes} from "./routes";
import {Router} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import "./styles/base.css";
import discReducer from "./reducers";
//import thunkMiddleware from "redux-thunk";
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, compose } from 'react-apollo';
import {getGraph} from "./actions"; 
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ 
      uri: 'http://localhost:8080/',
      opts: {
              credentials: 'same-origin'
          } 
    }),
});

window.webappStart = () => {
  injectTapEventPlugin();
  const initialState = window.__PRELOADED_STATE__;
  const store = createStore(
    combineReducers({
      discs: discReducer,
      apollo: client.reducer(),
    }),
    {}, // initial state
    compose(
        applyMiddleware(client.middleware()), 
   //    applyMiddleware(thunkMiddleware, reduxImmutableStateInvariant()),
        // If you are using the devToolsExtension, you can add it here also
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    )
  );

 // store.dispatch(getGraph());
  render(
    <ApolloProvider store={store} client={client}>
      <Router>{routes}</Router>
    </ApolloProvider>,
    document.querySelector(".js-content")
  );
};

