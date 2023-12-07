import React, { useState, useEffect } from "react";
import "../App.css";

const Game = ({ players }) => {
  const initialBoardState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [board, setBoard] = useState(initialBoardState);
  const [isPlayerO, setIsPlayerO] = useState(false);
  const [scorePlayerX, setScorePlayerX] = useState(0);
  const [scorePlayerO, setScorePlayerO] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const handleCellClick = (row, col, event) => {
    event.stopPropagation();

    if (!board[row][col] && !isGameWon) {
      const symbol = isPlayerO ? "O" : "X";
      board[row][col] = symbol;
      checkWin(row, col, symbol);
      setBoard([...board]);
      setIsPlayerO(!isPlayerO);
    }
  };

  const checkWin = (row, col, symbol) => {
    let countRow = 0;
    let countCol = 0;
    let countPosDiagonal = 0;
    let countNegDiagonal = 0;
    let pos = 0;
    let neg = 2;

    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === symbol) countRow++;
      if (board[i][col] === symbol) countCol++;
      if (board[pos][pos] === symbol) {
        countPosDiagonal++;
        pos++;
      }
      if (board[i][neg] === symbol) {
        countNegDiagonal++;
        neg--;
      }
    }

    if (countRow === 3 || countCol === 3 || countPosDiagonal === 3 || countNegDiagonal === 3) {
      handleWin(symbol);
    } else if (board.flat().every((cell) => cell !== "")) {
      handleDraw();
    }
  };

  const handleWin = (symbol) => {
    symbol === "X" ? setScorePlayerX(scorePlayerX + 1) : setScorePlayerO(scorePlayerO + 1);
    setIsGameWon(true);
    setTimeout(() => alert(`${symbol} wins!`), 0);
  };

  const handleDraw = () => {
    alert("Draw!");
    setIsGameWon(true);
  };

  useEffect(() => {
    if (isGameWon) {
      setBoard(initialBoardState);
      setIsGameWon(false);
    }
  }, [isGameWon]);

  return (
    <>
      <div className="winner"></div>
      <div className="show-score">
        {players.map(({ firstName, secondName }, idx) => (
          <div key={idx} className="name-container">
            <span className="sub-name-container">
              <span className="form-label">{firstName}</span>
            </span>{" "}
            <span> {scorePlayerX} </span> 🚦
            <span>{scorePlayerO}</span>
            <span className="sub-name-container">
              <span className="form-label">{secondName}</span>
            </span>
          </div>
        ))}
      </div>
      <div onClick={(e) => handleCellClick(e)} className="input-container">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div key={`${i}-${j}`} onClick={(e) => handleCellClick(i, j, e)} className="input">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={() => setIsGameWon(!isGameWon)}>
        Reset game
      </button>
    </>
  );
};

export default Game;


// import React, { useState, useEffect } from "react";
// import "../App.css";
// const Game = ({ players }) => {
//   const [data, setData] = useState([
//     ["", "", ""],
//     ["", "", ""],
//     ["", "", ""],
//   ]);

//   const [whatFill, setWhatFill] = useState(false);
//   const [playerA, setPlayerA] = useState(0);
//   const [playerB, setPlayerB] = useState(0);
//   const [isWin, setIsWin] = useState(false);
//   const clickHandle = (i, j, e) => {
//     e.stopPropagation();
//     if (!data[i][j]) {
//       const sym = whatFill ? "0" : "X";
//       data[i][j] = sym;
//       checker(i, j, sym);
//       setData([...data]);
//       setWhatFill(!whatFill);
//     }
//   };

//   const checker = (i, j, sym) => {
//     let countRow = 0;
//     let countColumn = 0;
//     let countPosDaigonal = 0;
//     let countNegDaigonal = 0;
//     let pos = 0;
//     let neg = 2;

//     for (let m = 0; m < data[i].length; m++) {
//       if (data[i][m] === sym) countRow++;
//       if (data[m][j] === sym) countColumn++;
//       if (data[pos][pos] === sym) {
//         countPosDaigonal++;
//         pos++;
//       }
//       if (data[m][neg] === sym) {
//         countNegDaigonal++;
//         neg--;
//       }
//     }
//     if (count % 9 === 0) {
//       alert("draw")
//       setTimeout(() => {
//         setIsWin(!isWin);
//       }, 0);
//     }

//     // for (let i = 0; i < 100; i++) {
//     //    console.log({"/":i / 9});
//     //    console.log({"%":i % 9});
//     //    console.log(i);
//     // }
//     if (
//       countRow === 3 ||
//       countColumn === 3 ||
//       countPosDaigonal === 3 ||
//       countNegDaigonal === 3
//     ) {
//       data[i][j] === "0" ? setPlayerA(playerA + 1) : setPlayerB(playerB + 1);
//       setTimeout(() => alert(`win`, 0));
//       setIsWin(!isWin);
//     }
//   };
//   useEffect(() => {

//       setData([
//         ["", "", ""],
//         ["", "", ""],
//         ["", "", ""],
//       ]);
//       setCount(1)
//   }, [isWin]);

//   return (
//     <>
//       <div className="winner"></div>
//       <div className="show-score">
//         {players.map(({ firstName, secondName }, idx) => {
//           return (
//             <>
//               <div key={idx} div className="name-container">
//                 <span className="sub-name-container">
//                   <span className="form-label">{firstName}</span>
//                 </span>{" "}
//                 <span> {playerA} </span> 🚦
//                 <span>{playerB}</span>
//                 <span className="sub-name-container">
//                   <span className="form-label">{secondName}</span>
//                 </span>
//               </div>
//             </>
//           );
//         })}
//       </div>
//       <div onClick={(e) => clickHandle(e)} className="input-container">
//         {data.map((subArr, i) => {
//           return subArr.map((val, j) => {
//             return (
//               <div
//                 onClick={(e) => clickHandle(i, j, e)}

//                 className="input"
//               >
//                 {val}
//               </div>
//             );
//           });
//         })}
//       </div>
//       <button className="reset-button" onClick={() => setIsWin(!isWin)}>
//         Reset game
//       </button>
//     </>
//   );
// };

// export default Game;
