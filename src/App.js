import React from "react";
import "./App.css";
import { SingleCard } from "./component/SingleCard";
export const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
function App() {
  const [cards, setCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);
  const [firstChoice, setFirstChoice] = React.useState(null);
  const [secondChoice, setSecondChoice] = React.useState(null);
  const [disabled, setdisabled] = React.useState(false);
  console.log(cards);
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };
  React.useEffect(() => {
    if (firstChoice && secondChoice) {
      setdisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        console.log("Successful");
        resetTurn();
      } else {
        console.log("Cards didnt match");
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);
  React.useEffect(() => {
    shuffleCards();
  }, []);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prev) => prev + 1);
    setdisabled(false);
  };
  console.log(firstChoice, secondChoice);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={() => shuffleCards()}>New Game</button>
      <div className="card-container">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            firstChoice={firstChoice}
            secondChoice={secondChoice}
            flipped={
              card === firstChoice || card === secondChoice || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
