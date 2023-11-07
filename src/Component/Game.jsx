import React, { useState, useEffect } from "react";
import "../App.css";
const Game = ({ players }) => {
  const [data, setData] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isCheck, setIsCheck] = useState(false);
  const [playerA, setPlayerA] = useState(0);
  const [playerB, setPlayerB] = useState(0);
  const [clean, setClean] = useState(false);
  const clickHandle = (i, j, e) => {
    e.stopPropagation();
    if (!data[i][j]) {
      const sym = isCheck ? "0" : "X";
      data[i][j] = sym;
      checker(i, j, sym);
      setData([...data]);
      setIsCheck(!isCheck);
    }
  };
  const checker = (i, j, sym) => {
    let countRow = 0;
    let countColumn = 0;
    let countPosDaigonal = 0;
    let countNegDaigonal = 0;
    let pos = 0;
    let neg = 2;
    for (let m = 0; m < data[i].length; m++) {
      if (data[i][m] === sym) countRow++;
      if (data[m][j] === sym) countColumn++;
      if (data[pos][pos] === sym) {
        countPosDaigonal++;
        pos++;
      }
      if (data[m][neg] === sym) {
        countNegDaigonal++;
        neg--;
      }
    }

    if (
      countRow === 3 ||
      countColumn === 3 ||
      countPosDaigonal === 3 ||
      countNegDaigonal === 3
    ) {
      data[i][j] === "0" ? setPlayerA(playerA + 1) : setPlayerB(playerB + 1);
      setTimeout(() => alert(`win`, 0));
      setClean(!clean)
    }
  };

  useEffect(() => {
    setData([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  }, [clean]);

  return (
    <>
      <div className="winner"></div>
      <div className="show-score">
        {players.map(({ firstName, secondName }, idx) => {
          return (
            <>
              <div div className="name-container">
                <span className="sub-name-container">
                  <span className="form-label">{firstName}</span>
                </span>{" "}
                <span> {playerA} </span>
                <span>{playerB}</span>
                <span className="sub-name-container">
                  <span className="form-label">{secondName}</span>
                </span>
              </div>
            </>
          );
        })}
      </div>
      <div onClick={(e) => clickHandle(e)} className="input-container">
        {data.map((subArr, i) => {
          return subArr.map((val, j) => {
            return (
              <div
                onClick={(e) => clickHandle(i, j, e)}
                key={j + " " + i}
                className="input"
              >
                {val}
              </div>
            );
          });
        })}
      </div>
      <button className="reset-button" onClick={() => setClean(!clean)}>
        Reset game
      </button>
    </>
  );
};

export default Game;
