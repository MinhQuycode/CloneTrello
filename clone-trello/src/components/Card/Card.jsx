import React from "react";

import "./Card.scss";

const Card = ({ card }) => {
  return (
    <li className="task-item">
      {card.cover && <img src={card.cover} alt="Img my work" />}
      {card.title}
    </li>
  );
};

export default Card;
