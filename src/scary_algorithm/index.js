export function evaluateBoard(board, original) {
    // 1 for X is winning, -1 for O is winning and 0 if tie
    if (XWin(board)) {
        if (original === true) {
            console.log("Evaluation: " + 1);
        }
        return 1;
    }
    if (OWin(board)) {
        if (original === true) {
            console.log("Evaluation: " + -1);
        }
        return -1;
    }
    if (tie(board)) {
        if (original === true) {
            console.log("Evaluation: " + 0);
        }
        return 0;
    }
    //determines player's turn
    var count = 0;
    var player_turn = 0;
    for (var i=0; i < board.length; i++) {
        if (board[i] === 0) {
            count++;
        }
    }
    if (count%2 === 1) {
        player_turn = 1;
    } else {
        player_turn = 2;
    }

    var moveList = [];
    var candidateMoves = [];
    var evaluationList = [];
    for (var i=0; i < board.length; i++) {
        var boardCopy = [...board];
        if (board[i] === 0) {
            boardCopy[i] = player_turn;
            moveList.push(i);
            evaluationList.push(evaluateBoard(boardCopy, false));
        }
    }
    var evaluation = 0;
    if (player_turn === 1) {
        evaluation = Math.max(...evaluationList);
    } else {
        evaluation = Math.min(...evaluationList);
    }

    for (var i=0; i < evaluationList.length; i++) {
        if (evaluationList[i] === evaluation) {
            candidateMoves.push(moveList[i]);
        }
    }
    
    if (original === true) {
        console.log("EvaluationList: " + evaluationList);
        console.log("CandidateMoves: " + candidateMoves);
        console.log("Evaluation: " + evaluation);
    }
    return evaluation;
    
}
function XWin(board) {
    var val = 1;
    return checkWin(board, val);
}

function OWin(board) {
    var val = 2;
    return checkWin(board, val);
}
function tie(board) {
    if (!XWin(board) && !OWin(board) && !board.includes(0)) {
        return true;
    } else {
        return false;
    }
}
function checkWin(board, val) {
    var topAcross = (val === board[0] && val === board[1] && val === board[2]);
    var midAcross = (val === board[3] && val === board[4] && val === board[5]);
    var botAcross = (val === board[6] && val === board[7] && val === board[8]);

    var leftDown = (val === board[0] && val === board[3] && val === board[6]);
    var midDown = (val === board[1] && val === board[4] && val === board[7]);
    var rightDown = (val === board[2] && val === board[5] && val === board[8]);

    var rightDiag = (val === board[0] && val === board[4] && val === board[8]);
    var leftDiag = (val === board[2] && val === board[4] && val === board[6]);

    return (topAcross || midAcross || botAcross || leftDown || midDown || rightDown || rightDiag || leftDiag);
}