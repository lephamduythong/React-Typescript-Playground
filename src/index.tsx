/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import * as serviceWorker from 'serviceWorker';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

// Initialize languages
import './locales/i18n';

import './app/config/axios';

// import './redux-basic';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import counterReducer from './store/reducers/counter';
import testReducer from './store/reducers/test';

// redux-thunk
import thunk from 'redux-thunk';

// redux-saga
import createSageMiddleware from 'redux-saga';
import { watchCounter } from 'store/sagas';
const sagaMiddleware = createSageMiddleware();

// Combine multiple reducers to one
const rootReducer = combineReducers({
  counterReducer: counterReducer,
  testReducer: testReducer,
});

export type MyRootState = ReturnType<typeof rootReducer>;

const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] dispatching', action);
      const result = next(action);
      console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

// Integrate dev tool extension for Chrome, Firefox
const composeEnhancers =
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

const myStore = createStore(
  rootReducer,
  applyMiddleware(thunk, sagaMiddleware, logger),
);

sagaMiddleware.run(watchCounter);

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  // <Provider store={store}>
  //   <ThemeProvider>
  //     <HelmetProvider>
  //       <React.StrictMode>

  //       </React.StrictMode>
  //     </HelmetProvider>
  //   </ThemeProvider>
  // </Provider>
  <Provider store={myStore}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
