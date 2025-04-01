import { useState, useEffect } from "react";
import "./App.css";
import { IoIosCreate } from "react-icons/io";
import { IoLogoReact } from "react-icons/io5";

const words = [
  "apple",
  "table",
  "chair",
  "react",
  "vital",
  "plant",
  "water",
  "stone",
  "peace",
  "night",
  "dream",
  "track",
  "world",
  "music",
  "light",
  "brave",
  "learn",
  "peace",
  "money",
  "house",
  "smile",
  "focus",
  "speed",
  "grape",
  "plane",
  "truth",
  "march",
  "rainy",
  "bride",
  "shine",
  "write",
  "start",
  "green",
  "white",
  "power",
  "fight",
  "swarm",
  "reach",
  "candy",
  "lucky",
  "bright",
  "clear",
  "happy",
  "quick",
  "speed",
  "chase",
  "clean",
  "drain",
  "train",
  "storm",
  "fruit",
  "shore",
  "error",
  "storm",
  "water",
  "fight",
  "trend",
  "equal",
  "peace",
  "faith",
  "honey",
  "light",
  "peace",
  "chain",
  "place",
  "grape",
  "enter",
  "broke",
  "flare",
  "grind",
  "touch",
  "color",
  "crash",
  "found",
  "sense",
  "sense",
  "track",
  "turn",
  "laugh",
  "crowd",
  "fight",
  "rider",
];

export default function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleGuess = () => {
    if (input.length !== 5 || gameOver) return; 

    const feedback = Array(5).fill("gray");

    let newGuess = input.split("").map((letter, index) => {
      if (letter === currentWord[index]) {
        feedback[index] = "green";
      } else if (currentWord.includes(letter)) {
        feedback[index] = "yellow";
      }
      return { letter, feedback: feedback[index] };
    });

    setGuesses((prevGuesses) => [...prevGuesses, newGuess]);

    if (input === currentWord) {
      setGameOver(true);
      setScore(score + 1);
    } else if (guesses.length === 5) {
      setGameOver(true);
    }

    setInput("");
  };

  const restartGame = () => {
    setGuesses([]);
    setInput("");
    setGameOver(false);
    setScore(0);
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Wordle - Guess the Word</h1>
      <div className="game-info">
        <p>
          Score: <span>{score}</span>
        </p>
        <p>Guesses left: {6 - guesses.length}</p>
      </div>

      {gameOver ? (
        <div className="game-over">
          <p>{input === currentWord ? "You Win!" : "Game Over!"}</p>
          <p>Correct word: {currentWord}</p>
          <button onClick={restartGame} className="restart-button">
            Restart
          </button>
        </div>
      ) : (
        guesses.map((guess, index) => (
          <div key={index} className="guess-row">
            {guess.map((item, i) => (
              <div key={i} className={`guess-tile ${item.feedback}`}>
                {item.letter.toUpperCase()}
              </div>
            ))}
          </div>
        ))
      )}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleGuess()}
        className="input-box"
        placeholder="Type your guess..."
      />
      {gameOver ? null : (
        <button onClick={handleGuess} className="guess-button">
          Guess
        </button>
      )}
      <span className="creator">
        <IoLogoReact className="icon" />
        created by @qurbonovozodbe
      </span>
    </div>
  );
}
