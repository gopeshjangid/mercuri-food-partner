import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import createReducer from './create-reducer';

export default function configureStore() {

  const middlewares = [thunk];

  const enhancers = [applyMiddleware(...middlewares)];

  const isDevelopmentMode = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  const composeEnhancers = isDevelopmentMode ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false, }) : compose;

  let store;

  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage/session').default;

    const persistConfig = {
      key: 'root',
      storage
    };

    store = createStore(
      persistReducer(persistConfig, createReducer),
      composeEnhancers(...enhancers)
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      createReducer,
      composeEnhancers(...enhancers)
    );
  }
  store = createStore(createReducer, composeEnhancers(...enhancers));

  return store;
}
