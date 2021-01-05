import { createStore, combineReducers } from 'redux';
import board from './reducers/board'
import player from './reducers/player'
  

const reducer = combineReducers({
    board,
    player
});

export const store = createStore(reducer);
