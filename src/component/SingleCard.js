import React from "react";
import "./SingleCard.css";
export const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front" />

        <img
          className="back"
          src="/img/cover.png"
          alt="back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
