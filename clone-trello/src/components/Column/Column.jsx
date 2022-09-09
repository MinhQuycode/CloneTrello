import Card from "components/Card/Card";
import React from "react";
import { mapOrder } from "utils/sort";

import "./Column.scss";

const Column = ({ column }) => {
  // sort columns
  const cardList = mapOrder(column.cards, column.cardOrder, "id");

  return (
    <div className="column">
      <header>{column.title}</header>
      <ul className="task-list">
        {cardList.map((card, index) => {
          return <Card card={card} key={index} />;
        })}
      </ul>
      <footer>Add another card</footer>
    </div>
  );
};

export default Column;
