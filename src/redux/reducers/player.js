import {
    START_GAME,
    PLAYER_ACTION,
    AI_TURN,
    PLAYER1_WINS,
    PLAYER2_WINS,
    PLAYERS_TIE,
    SWITCH_GAMEMODE,
    RESET_GAME
} from '../actionTypes';

const defaultState = {
    currentPlayer: 1,
    player1Wins: 0,
    player2Wins: 0,
    ties: 0
}

var playere_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                currentPlayer: 1
            };
        case PLAYER_ACTION:
        case AI_TURN:
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
                player2Wins: state.player2Wins + 1
            };
        case PLAYERS_TIE:
            return {
                ...state,
                ties: state.ties + 1
            };
        case SWITCH_GAMEMODE:
            return {
                ...state,
                currentPlayer: 1,
                player1Wins: 0,
                player2Wins: 0,
                ties: 0,
            }
        case RESET_GAME:
            return {
                ...state,
                currentPlayer: 1
            }
        default:
            return state;
    }
};

export default playere_reducer;