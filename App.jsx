import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const timerRef = useRef(null);
  const [gameActive, setGameActive] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(
    function () {
      if (gameActive) {
        timerRef.current = setInterval(
          () => setTime((oldTime) => oldTime + 1),
          1000
        );
      }

      return () => {
        clearInterval(timerRef.current);
      };
    },
    [gameActive]
  );

  useEffect(
    function () {
      if (gameWon) {
        setGameActive(false);
      }
    },
    [gameWon]
  );

  function rollDice() {
    if (!gameActive) {
      setGameActive(true);
    }

    if (!gameWon) {
      setRolls((oldRoll) => oldRoll + 1);
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setRolls(0);
      setTime(0);
      setGameActive(false);
      setDice(generateAllNewDice());
    }
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="progress-container">
        <span ref={timerRef}>
          Timer: {Math.floor(time / 60)}:
          {(time % 60).toString().padStart(2, "0")}
        </span>
        <span>Roll Counter: {rolls}</span>
      </div>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
