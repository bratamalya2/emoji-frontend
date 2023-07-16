import React from "react";
import Card from "./card";

import "../styles/cards.css";

function Cards({ emojis, currentPage }) {
  return (
    <div className="card-container">
      {emojis.map((emoji, i) => {
        const index = i + 1;
        const minIndex = (currentPage - 1) * 10 + 1;
        const maxIndex = currentPage * 10;
        if (index >= minIndex && index <= maxIndex)
          return <Card key={i} emoji={emoji} />;
        else return null;
      })}
    </div>
  );
}

export default Cards;
