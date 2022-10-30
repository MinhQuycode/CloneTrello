import React from "react";

import "./Card.scss";

const Card = ({ card }) => {
  return (
    <div className="task-item">
      {card.cover && (
        <img
          src={card.cover}
          alt="Img my work"
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
      {card.title}
    </div>
  );
};

export default Card;
