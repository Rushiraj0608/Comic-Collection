import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import store from './store';
import { store, persistor } from './store';
// const persistor = persistStore(store);
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      
        <App />
    </PersistGate>
  </Provider>
    </BrowserRouter>
   
  </ApolloProvider>
);
