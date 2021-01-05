import {
    START_GAME,
    END_GAME,
    SWITCH_GAMEMODE,
    PLAYER_ACTION
} from '../actionTypes';

// 0 = blank, 1 = x, 2 = 0
const defaultState = {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    inProgress: true,
    gamemode: 0
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                inProgress: true
            };
        case END_GAME:
            return {
                ...state,
                inProgress: false
            };
        case SWITCH_GAMEMODE:
            return {
                ...state,
                gamemode: action.payload,
                board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                inProgress: false
            };
        case PLAYER_ACTION:
            var new_board = [...state.board];
            new_board[action.payload[0]] = action.payload[1]
            return {
                ...state,
                board: new_board
            };
        default:
            return state;
    }
};