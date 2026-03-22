import React, { useState, useEffect } from "react";
import Entity from "./Entity";
import GameOver from "./GameOver";
import Log from "./Log";
// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// Create an attack log
function createLogAttack(attacker, damage) {
  return {
    isPlayer: attacker === "player",
    text: `${attacker === "player" ? "Player" : "Monster"} takes ${damage} damage`,
    type: "attack",
  };
  }
// Create a healing log
function createLogHeal(healer, healAmount) {
  return {
    isPlayer: healer === "player",
    text: `${healer === "player" ? "Player" : "Monster"} heals ${healAmount} life points`,
    type: "heal",
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");
  
  const [specialCooldown, setSpecialCooldown] = useState(0); // cooldown counter
  const [roundCount, setRoundCount] = useState(0);           // total turns played
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  function addLog(log) {
    setLogs(prev => [log, ...prev]);
  }

  // Attack
  function attackHandler() {
    const monsterDamage = getRandomValue(5, 12);
    const playerDamage = getRandomValue(5, 12);

    setMonsterHealth(prev => Math.max(prev - monsterDamage, 0));
    setPlayerHealth(prev => Math.max(prev - playerDamage, 0));

    addLog(createLogAttack("player", monsterDamage));
    addLog(createLogAttack("monster", playerDamage));

    if (specialCooldown > 0) setSpecialCooldown(prev => prev - 1);
    setRoundCount(prev => prev + 1);
  }

  // Special Attack
  function specialAttackHandler() {
    const monsterDamage = getRandomValue(8, 25);
    const playerDamage = getRandomValue(8, 25);

    setMonsterHealth(prev => Math.max(prev - monsterDamage, 0));
    setPlayerHealth(prev => Math.max(prev - playerDamage, 0));

    addLog(createLogAttack("player", monsterDamage));
    addLog(createLogAttack("monster", playerDamage));

    setSpecialCooldown(3); // disable for 3 turns after use
  }

  // Heal
  function healHandler() {
    const heal = getRandomValue(8, 15);
    const monsterDamage = getRandomValue(5, 12);

    setPlayerHealth(prev => Math.max(Math.min(prev + heal - monsterDamage, 100), 0));

    addLog(createLogHeal("player", heal));
    addLog(createLogAttack("monster", monsterDamage));

    if (specialCooldown > 0) setSpecialCooldown(prev => prev - 1);
    setRoundCount(prev => prev + 1);
  }

  // Surrender
  function surrenderHandler() {
    setResult("You lost!");
    setGameOver(true);
  }

  // Restart
  function restartGame() {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setGameOver(false);
    setResult("");
    setSpecialCooldown(0);
    setRoundCount(0);
  }

  // Game over logic
  useEffect(() => {
    if (playerHealth <= 0 && monsterHealth <= 0) {
      setResult("Draw!");
      setGameOver(true);
    } else if (playerHealth <= 0) {
      setResult("You lost!");
      setGameOver(true);
    } else if (monsterHealth <= 0) {
      setResult("You won!");
      setGameOver(true);
    }
  }, [playerHealth, monsterHealth]);
  
  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function renderControls() {
    if (gameOver) return null;
    return (
      <section id="controls">
        <button onClick={attackHandler}>ATTACK</button>
        <button
          onClick={specialAttackHandler}
          disabled={roundCount < 3 || specialCooldown > 0}
        >
          SPECIAL!
        </button>
        <button onClick={healHandler}>HEAL</button>
        <button onClick={surrenderHandler}>SURRENDER</button>
      </section>
    );
  }
  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <>
      <Entity title="Monster Health" health={monsterHealth} />
      <Entity title="Your Health" health={playerHealth} />

      {renderControls()}

      {gameOver && <GameOver title={result} restartGame={restartGame} />}

      <Log logs={logs} />
    </>
  );
}

export default Game;