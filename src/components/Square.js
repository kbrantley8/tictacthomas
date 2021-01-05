import React from 'react';
import { connect } from 'react-redux';
import { PLAYER_ACTION, SWITCH_PLAYER_TURN } from '../redux/actionTypes'

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
    ...state.player
});

const mapDispatchToProps = dispatch => ({
    placeMove: (ind, player) => dispatch({ type: PLAYER_ACTION, payload: [ ind, player ] }),
    switchTurn: () => dispatch({ type: SWITCH_PLAYER_TURN })

});

class Square extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            status: props.status,
            index: props.index
        }
    }
    
    render() {
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
                    <div id={'square' + this.state.index} className="square">
                        <div className={indexList[this.state.index]}>
                            <div className="x">
                            </div>
                        </div>
                    </div>
                );
            case 2: 
                return (
                    <div id={'square' + this.state.index} className="square">
                        <div className={indexList[this.state.index]}>
                            <div className="o">
                            </div>
                        </div>
                    </div>
                );
        }
    }

    handleSquareClick = () => {
        if (this.state.status === 0) {
            this.props.placeMove(this.state.index, this.props.currentPlayer)
            this.props.switchTurn()
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);