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
    this.state = {
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  updateBoard = (index, value) => {
    console.log(index, value)
    var new_board = this.state.board;
    new_board[index] = value;
    this.setState({ board: new_board })
  }

  render() {
    console.log(this.state.board);
    evaluateBoard(this.props.board, true);
    return (
      <div className="App">
        <Menu />
        <div id="title">
          <h1>TIC TAC THOMAS</h1>
        </div>
        <div id="game_board">
          <div className="game_board_outline">
            {this.state.board.map(function(status, index) {
              console.log(status, index)
              return <Square 
                key={index}
                status={status}
                index={index}
                updateBoard={this.updateBoard}
              />
            }, this)}
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
