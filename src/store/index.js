import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/rootSaga';
import rootReducer from '../redux/rootReducer';
import "regenerator-runtime/runtime";

const sagaMiddleware = createSagaMiddleware();

const createAppStore = () => {
      const Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
     // use the same saga middleware that you have enhanced your store with
     sagaMiddleware.run(rootSaga);
      return Store;
}

export const AppStore = createAppStore();

