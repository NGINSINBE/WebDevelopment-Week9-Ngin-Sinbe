// GameOver.jsx
import React from "react";

function GameOver({ title, restartGame }) {
  return (
    <section className="container">
      <h2>{title}</h2>
      <button onClick={restartGame}>Restart Game</button>
    </section>
  );
}

export default GameOver;