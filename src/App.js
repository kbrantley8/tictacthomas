import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import {evaluateBoard} from './scary_algorithm/index.js';
import Square from './components/Square';
import Menu from './components/Menu';

const mapStateToProps = state => ({
  ...state.board,
  ...state.player
});

class App extends React.Component {
  constructor(props) {
    super(props)
    document.body.style = 'background: black;';
    // evaluateBoard(this.props.board, true);
  }
  render() {
    console.log(this.props.board);
    evaluateBoard(this.props.board, true);
    return (
      <div className="App">
        <Menu />
        <div id="title">
          <h1>TIC TAC THOMAS</h1>
        </div>
        <div id="game_board">
          <div className="game_board_outline">
            {this.props.board.map((status, index) => (
              <Square 
                status={status}
                index={index}
                board={this.props.board}
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
                <h3>Player 2</h3>
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

export default connect(mapStateToProps, null)(App);
