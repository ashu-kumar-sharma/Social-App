import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducer/rootReducer';

const store = createStore(rootReducer,  compose(applyMiddleware(thunk))
    );
// store.subscribe(() => {
// console.log("Store has changed", store.getState());
// });
export default store;