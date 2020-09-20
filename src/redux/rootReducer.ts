
import { combineReducers } from 'redux';
import settlement from './settlement.redux';
import menuTab from './menuTab.redux';

export default combineReducers({
  settlement,
  menuTab
});
