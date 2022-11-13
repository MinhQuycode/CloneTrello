import Card from "components/Card/Card";
import React, { useEffect } from "react";
import { mapOrder } from "utils/sort";
import { Container, Draggable } from "react-smooth-dnd";

import "./Column.scss";
import { useState } from "react";
import ConfirmModal from "components/Common/ConfirmModal";
import useClickOutside from "hooks/useClickOutSize";
import { useRef } from "react";

const Column = ({ column, onCardDrop, onUpdateColumn }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  const handleColumnTitleChange = (e) => {
    setColumnTitle(e.target.value);
  };

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle,
    };
    onUpdateColumn(newColumn);
  };

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  const toggleShowComfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };
  const ref = useRef();

  useClickOutside(ref, () => {
    setShowConfirmModal(false);
  });

  const handleAction = () => {
    toggleShowComfirmModal();
  };

  // sort columns
  const cardList = mapOrder(column.cards, column.cardOrder, "id");

  const selectAllInlineText = (e) => {
    e.target.focus();
    e.target.select();
  };

  const updateColumn = () => {
    const newColumn = {
      ...column,
      _destroy: true,
    };
    onUpdateColumn(newColumn);
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <input
            type="text"
            className="trelo-content-editable"
            value={columnTitle}
            spellCheck="false"
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-action">
          <i
            className="fa fa-angle-down"
            aria-hidden="true"
            onClick={() => setShowDropDown(!showDropDown)}
          ></i>
          {showDropDown && (
            <div className="option-dropdown">
              <ul>
                <li>Thao tác</li>
                <li>Add card</li>
                <li onClick={toggleShowComfirmModal}>Remove column</li>
                <li>Move all cards in this column</li>
                <li>Archive all cards in this column</li>
              </ul>
            </div>
          )}
        </div>
      </header>
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
      <ConfirmModal
        ref={ref}
        show={showConfirmModal}
        onAction={handleAction}
        onUpdateColumn={updateColumn}
        title="Remove column"
        content={`Are you sure you want to remove ${column.title} !`}
      />
    </div>
  );
};

export default Column;
