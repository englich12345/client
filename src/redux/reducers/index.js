import { combineReducers } from 'redux';
import demoReducer from './demo.reducer';
import userReducer from './user.reducer';
export default combineReducers({
    demo: demoReducer,
    user: userReducer
});
