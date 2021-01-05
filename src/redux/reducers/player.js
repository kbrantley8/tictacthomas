import {
    START_GAME,
    END_GAME,
    SWITCH_PLAYER_TURN,
    PLAYER1_WINS,
    PLAYER2_WINS,
    PLAYERS_TIE,
    RESET_GAME
} from '../actionTypes';
const defaultState = {
    currentPlayer: 1,
    player1Wins: 0,
    player2Wins: 0,
    ties: 0
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                currentPlayer: 1
            };
        case END_GAME:
            return {
                ...state,
                currentPlayer: 0
            };
        case SWITCH_PLAYER_TURN:
            return {
                ...state,
                currentPlayer: (state.currentPlayer % 2) + 1
            };
        case PLAYER1_WINS:
            return {
                ...state,
                player1Wins: state.player1Wins + 1
            };
        case PLAYER2_WINS:
            return {
                ...state,
                player1Wins: state.player2Wins + 1
            };
        case PLAYERS_TIE:
            return {
                ...state,
                ties: state.ties + 1
            }
        case RESET_GAME:
            return {
                defaultState
            }
        default:
            return state;
    }
};