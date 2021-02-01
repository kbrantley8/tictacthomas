import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Square from './components/Square';
import { CHANGE_BACKGROUND, CHECK_WIN, PLAYER1_WINS, PLAYER2_WINS, PLAYERS_TIE, START_GAME, SWITCH_GAMEMODE } from './redux/actionTypes'

const mapStateToProps = state => ({
  ...state.board,
  ...state.player
});

const mapDispatchToProps = dispatch => ({
  checkWin: (board) => dispatch({ type: CHECK_WIN, payload: board }),
  player1Win: () => dispatch({ type: PLAYER1_WINS }),
  player2Win: () => dispatch({ type: PLAYER2_WINS }),
  playersTie: () => dispatch({ type: PLAYERS_TIE }),
  startGame: () => dispatch({ type: START_GAME }),
  changeGamemode: (num) => dispatch({ type: SWITCH_GAMEMODE, payload: num }),
  changeBackground: () => dispatch({ type: CHANGE_BACKGROUND })
});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.startGame();
  }

  componentDidUpdate() {
    switch(this.props.winner) {
      case 1: {
        this.props.player1Win();
        break;
      }
      case 2: {
        this.props.player2Win();
        break;
      }
      case 3: {
        this.props.playersTie();
        break;
      }
      default: {
        break;
      }
    }
  }

  updateGamemode = (num) => {
    if (this.props.gamemode !== num) {
      this.props.changeGamemode(num);
    }
  }

  changeBackground = () => {
    this.props.changeBackground();
  }

  render() {
    return (
      <div className="App">
        <div id="title">
          <h1 onClick={() => this.changeBackground()}>TIC TAC THOMAS</h1>
        </div>
        <div className="menu">
          <div className={(this.props.gamemode === 0) ? "selected menu_item" : "menu_item"} onClick={() => this.updateGamemode(0)}>
              <h3>Player vs AI</h3>
          </div>
          <div style={{ padding: '7px', display: 'inline', width: '20%' }}>
              <h3>~OR~</h3>
          </div>
          <div className={(this.props.gamemode === 1) ? "selected menu_item" : "menu_item"}  onClick={() => this.updateGamemode(1)}>
              <h3>Player vs Player</h3>
          </div>
        </div>
        <div id="game_board">
          <div key={this.props.board} style={(this.props.background) ? { border: "3px solid white" } : {}} className="game_board_outline">
            {this.props.board.map((status, index) => (
              <Square 
                key={index}
                status={status}
                index={index}
              />
            ))}
          </div>
        </div>
        <div id="player_info">
          <div className="player_info">
              <div className="player1">
                <h3>Player 1</h3>
              </div>
              <div className="ties">
                <h3>Ties</h3>
              </div>
              <div className="player2">
                <h3>{this.props.gamemode === 0 ? "AI" : "Player 2"}</h3>
              </div>
              <div className="player1">
                <h3>{this.props.player1Wins}</h3>
              </div>
              <div className="ties">
                <h3>{this.props.ties}</h3>
              </div>
              <div className="player2">
                <h3>{this.props.player2Wins}</h3>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
