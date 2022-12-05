import Card from "components/Card/Card";
import React, { useEffect } from "react";
import { mapOrder } from "utils/sort";
import { Container, Draggable } from "react-smooth-dnd";

import "./Column.scss";
import { useState } from "react";
import ConfirmModal from "components/Common/ConfirmModal";
import useClickOutside from "hooks/useClickOutSize";
import { useRef } from "react";
import {cloneDeep} from "lodash"

const Column = ({ column, onCardDrop, onUpdateColumn }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleNewCard = () => {
    setOpenNewCardForm(!openNewCardForm);
  };
  const [newCardTitle, setNewCardTitle] = useState("");
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value);

  const refInput = useRef(null)

  useEffect(() => {
    if (refInput && refInput.current) {
      refInput.current.focus();
      refInput.current.select();
    }
  }, [openNewCardForm]);


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



  const addNewCard = () => {
    if (!newCardTitle) {
      refInput.current.focus();
      return;
    }

    const newCardAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: column.boardId,
      title: newCardTitle.trim(),
      columnId: column.id,
      cover:null,
    };

    let newColumn = cloneDeep(column);
    newColumn.cards.push(newCardAdd)
    newColumn.cardOrder.push(newCardAdd.id)
    onUpdateColumn(newColumn)
    setNewCardTitle("")
    setOpenNewCardForm(!openNewCardForm)
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
        {openNewCardForm &&  <div className="add-new-card-area">
        <div className="form-input">
            <input
              type="text"
              placeholder="Enter card title..."
              className="input-new-column"
              ref={refInput}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(e) => e.key === "Enter" && addNewCard()}
            />
            <div>
              <button  className="btn-add" onClick={addNewCard}>
                Add column
              </button>
              <span className="cancle_column" onClick={toggleNewCard} >
                X
              </span>
            </div>
          </div>
        </div>}
       
      </div>
      <footer>
      {!openNewCardForm &&  <div className="footer-actions" onClick={toggleNewCard}>
          <i className="fa fa-plus icon"/> Add another card
        </div> }
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
