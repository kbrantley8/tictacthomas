import React from 'react';
import { connect } from 'react-redux';
import { SWITCH_GAMEMODE } from '../redux/actionTypes';

const mapStateToProps = state => ({
    ...state.board
});

const mapDispatchToProps = dispatch => ({
    changeGamemode: (num) => dispatch({ type: SWITCH_GAMEMODE, payload: num })
});

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="menu">
                <div className={(this.props.gamemode === 0) ? "selected menu_item" : "menu_item"}>
                    <h3 onClick={() => this.props.changeGamemode(0)}>Player vs AI</h3>
                </div>
                <div style={{ padding: '7px'}}>
                    <h3>~OR~</h3>
                </div>
                <div className={(this.props.gamemode === 1) ? "selected menu_item" : "menu_item"}>
                    <h4 onClick={() => this.props.changeGamemode(1)} >Player vs Player</h4>
                </div>
            </div>
        )
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);