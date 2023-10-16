import React, { useEffect, useRef, useState } from "react";
import "./App.css";
const App = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [players, setPlayers] = useState([]);
  const [showGame, setShowGame] = useState(false);

  return (
    <div>
      {showGame && <Game players={players} />}
      {showGame || (
        <UserForm
          firstName={firstName}
          setFirstName={setFirstName}
          secondName={secondName}
          setSecondName={setSecondName}
          players={players}
          setPlayers={setPlayers}
          setShowGame={setShowGame}
          showGame={showGame}
        />
      )}
    </div>
  );
};
const UserForm = (prop) => {
  const [count, setCount] = useState(1);

  const {
    firstName,
    setFirstName,
    secondName,
    setSecondName,
    players,
    setPlayers,
    setShowGame,
    showGame,
  } = prop;
  const submitHandle = (e) => {
    e.preventDefault();
    setPlayers([...players, { firstName: firstName, secondName: secondName }]);
    setShowGame(!showGame);
  };

  useEffect(() => {
    return () => {
      setFirstName("");
      setSecondName("");
    };
  }, [players]);

  return (
    <>
      <div>
        <form onSubmit={(e) => submitHandle(e)}>
          {(function () {
            switch (count) {
              case "1":
                return (
                  <>
                    <div>
                      <input
                        type="text"
                        placeholder=" First Player Name"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                      <button onClick={() => setCount(count + 1)}>
                      Next Player
                    </button>
                    </div>


                  </>
                );

              case "2":
                return (
                  <>
                    <div>
                      <input
                        type="text"
                        placeholder=" Second Player Name"
                        name="secondName"
                        onChange={(e) => setSecondName(e.target.value)}
                        value={secondName}
                      />
                    </div>
                  </>
                );
            }
          })()}

          <button type="submit">Submit</button>
        </form>
      </div>
      <div></div>
    </>
  );
};
const Game = ({ players }) => {
  const [data, setData] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isCheck, setIsCheck] = useState(false);
  const [playerA, setPlayerA] = useState(0);
  const [playerAName, setPlayerAName] = useState("");
  const [playerB, setPlayerB] = useState(0);
  const [playerBName, setPlayerBName] = useState("");
  const [clean, setClean] = useState(false);
  const [isWin, setIsWin] = useState(false);
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
      if (data[pos][pos] == sym) {
        countPosDaigonal++;
        pos++;
      }
      if (data[m][neg] == sym) {
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

      setIsWin(!isWin);
      setTimeout(() => alert("win", 0));
      setData([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    }
  };
  useEffect(() => {
    setClean(!clean);
  }, [isWin]);

  useEffect(() => {
    return () =>
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
        {players.map((obj) => {
          return (
            <>
              <span>
                {playerA} {obj.firstName}(0)
              </span>
              <span>
                {playerB} {obj.secondName}(X)
              </span>
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
      <button onClick={() => setClean(!clean)}>Reset game</button>
    </>
  );
};
export default App;
