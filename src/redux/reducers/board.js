import {
    START_GAME,
    END_GAME,
    SWITCH_GAMEMODE,
    PLAYER_ACTION,
    AI_TURN,
    PLAYER1_WINS,
    PLAYER2_WINS,
    PLAYERS_TIE,
    RESET_GAME
} from '../actionTypes';
import { Game_AI } from '../../scary_algorithm/index';

// 0 = blank, 1 = x, 2 = 0
// winner: 1 = 1st player, 2 = 2nd, 3 = tie
const defaultState = {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    inProgress: true,
    gamemode: 0,
    winner: 0
}

var board_reducer = (state = defaultState, action) => {
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
                inProgress: true
            };
        case PLAYER_ACTION:
            var new_board = [...state.board];
            new_board[action.payload[0]] = action.payload[1]
            var game_ai = new Game_AI();
            if (game_ai.XWin(new_board)) {
                return {
                    ...state,
                    board: new_board,
                    winner: 1
                };
            } else if (game_ai.OWin(new_board)) {
                return {
                    ...state,
                    board: new_board,
                    winner: 2
                };
            } else if (game_ai.tie(new_board)) {
                return {
                    ...state,
                    board: new_board,
                    winner: 3
                };
            } else {
                return {
                    ...state,
                    board: new_board,
                    winner: 0
                };
            }
        case AI_TURN:
            if (state.gamemode === 0 && action.payload === 1 && state.inProgress) {
                game_ai = new Game_AI();
                game_ai.evaluateBoard(state.board, true);
                var ind = game_ai.getCandidateMove();
                new_board = [...state.board];
                new_board[ind] = 2;
                if (game_ai.XWin(new_board)) {
                    return {
                        ...state,
                        board: new_board,
                        winner: 1
                    };
                } else if (game_ai.OWin(new_board)) {
                    return {
                        ...state,
                        board: new_board,
                        winner: 2
                    };
                } else if (game_ai.tie(new_board)) {
                    return {
                        ...state,
                        board: new_board,
                        winner: 3
                    };
                } else {
                    return {
                        ...state,
                        board: new_board,
                        winner: 0
                    };
                }
            } else {
                return {
                    ...state
                }
            }
        case PLAYER1_WINS:
        case PLAYER2_WINS:
        case PLAYERS_TIE:
            return {
                ...state,
                winner: 0,
                inProgress: false
            }
        case RESET_GAME:
            return {
                ...state,
                board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                inProgress: true
            }
        default:
            return state;
    }
};

export default board_reducer;