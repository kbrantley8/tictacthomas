import React from 'react';
import { connect } from 'react-redux';
import { PLAYER_ACTION, AI_TURN, RESET_GAME } from '../redux/actionTypes'

const indexList = [
    "top left",
    "top",
    "top right",
    "middle left",
    "middle",
    "middle right",
    "bottom left",
    "bottom",
    "bottom right"
]

const mapStateToProps = state => ({
    ...state.board,
    ...state.player
});

const mapDispatchToProps = dispatch => ({
    placeMove: (ind, player) => dispatch({ type: PLAYER_ACTION, payload: [ ind, player ] }),
    AITurn: (currentPlayer) => dispatch({ type: AI_TURN, payload: currentPlayer }),
    resetBoard: () => dispatch({ type: RESET_GAME })
});

class Square extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            status: props.status,
            index: props.index,
        }
        this.stillTurn = false;
    }
    
    render() {
        if (this.props.gamemode === 0) {
            if (this.props.currentPlayer === 1) {
                this.stillTurn = true;
            }
        }
        switch(this.state.status) {
            case 0: 
                return (
                    <div id={'square' + this.state.index} className="square" onClick={() => this.handleSquareClick()}> 
                        <div className={indexList[this.state.index]}>
                        </div>
                    </div>
                );
            case 1: 
                return (
                    <div id={'square' + this.state.index} className="square" onClick={() => this.handleSquareClick()}>
                        <div className={indexList[this.state.index]}>
                            <div className="x">
                            </div>
                        </div>
                    </div>
                );
            case 2: 
                return (
                    <div id={'square' + this.state.index} className="square" onClick={() => this.handleSquareClick()}>
                        <div className={indexList[this.state.index]}>
                            <div className="o">
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div id={'square' + this.state.index} className="square" onClick={() => this.handleSquareClick()}> 
                        <div className={indexList[this.state.index]}>
                        </div>
                    </div>
                );
        }
    }

    handleSquareClick = () => {
        if (!this.stillTurn && this.props.gamemode === 0) {
            return;
        }
        if (this.state.status === 0 && this.props.inProgress === true) {
            this.props.placeMove(this.state.index, this.props.currentPlayer)
            if (this.props.currentPlayer === 1 && this.props.gamemode === 0) {
                var currentThis = this;
                setTimeout(function() {
                    currentThis.props.AITurn(currentThis.props.currentPlayer)
                }, 500);
            }
        } else if (this.props.inProgress === false) {
            this.props.resetBoard()
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);