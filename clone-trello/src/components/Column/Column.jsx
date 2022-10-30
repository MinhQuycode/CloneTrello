import Card from "components/Card/Card";
import React from "react";
import { mapOrder } from "utils/sort";
import { Container, Draggable } from "react-smooth-dnd";

import "./Column.scss";

const Column = ({ column, onCardDrop }) => {
  // sort columns
  const cardList = mapOrder(column.cards, column.cardOrder, "id");

  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>
      <div className="task-list">
        <Container
          groupName="col"
          onDrop={(dropResult) => {
            onCardDrop(column.id, dropResult);
          }}
          getChildPayload={(index) => cardList[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cardList.map((card, index) => {
            return (
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>
            );
          })}
        </Container>
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon" /> Add another card
        </div>
      </footer>
    </div>
  );
};

export default Column;
