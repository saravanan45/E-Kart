import { createStore, applyMiddleware } from 'redux';
import RootReducer from './RootReducer';

function ConfigureStore() {
  const store = createStore(
    RootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
export default ConfigureStore;
