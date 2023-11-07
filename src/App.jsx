import React, { useState } from "react";
import "./App.css";
import Game from "./Component/Game";
import UserForm from "./Component/UserForm";
const App = () => {
  const [players, setPlayers] = useState([]);
  return (
    <div>
      {players.length > 0 ? (
        <Game players={players} />
      ) : (
        <UserForm players={players} setPlayers={setPlayers} />
      )}
    </div>
  );
};

export default App;
