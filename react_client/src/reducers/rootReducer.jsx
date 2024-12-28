import { combineReducers } from 'redux';
import CollectionReducer from './CollectionReducer';
const rootReducer = combineReducers({
  collections: CollectionReducer
});

export default rootReducer;