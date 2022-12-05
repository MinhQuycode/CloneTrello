import Column from "components/Column/Column";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";

import "./BoardContent.scss";
import { initialData } from "actions/initData";
import { mapOrder } from "utils/sort";
import { applyDrag } from "utils/dragDrop";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleNewColumn = () => {
    setOpenNewColumnForm(!openNewColumnForm);
  };
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const refInput = useRef(null);

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFromDB) {
      setBoard(boardFromDB);

      // sort columns
      const columnsSorted = mapOrder(
        boardFromDB.columns,
        boardFromDB.columnOrder,
        "id"
      );
      setColumns(columnsSorted);
    }
  }, []);

  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value);

  useEffect(() => {
    if (refInput && refInput.current) {
      refInput.current.focus();
      refInput.current.select();
    }
  }, [openNewColumnForm]);

  if (isEmpty(board)) {
    return <div className="not-found">Board not found!</div>;
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;
    setBoard(newBoard);
    setColumns(newColumns);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((item) => item.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i.id);
      setColumns(newColumns);
    }
  };



  const addNewColumn = () => {
    if (!newColumnTitle) {
      refInput.current.focus();
      return;
    }

    const newColumnAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: [],
    };
    let newColumns = [...columns];
    newColumns.push(newColumnAdd);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;
    setBoard(newBoard);
    setColumns(newColumns);
    setNewColumnTitle("");
    toggleNewColumn();
  };

  const onUpdateColumn = (newColumnUpdate) => {
    const columnIdToUpdate = newColumnUpdate.id;
    let newColumns = [...columns];
    const columnIndexToUpdate = newColumns.findIndex(
      (i) => i.id === columnIdToUpdate
    );

    if (newColumnUpdate._destroy) {
      // Remove column
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      // Update column
      newColumns.splice(columnIndexToUpdate, 1, newColumnUpdate);
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;
    setBoard(newBoard);
    setColumns(newColumns);
  };



  return (
    <div className="board-contents">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "cards-drop-preview",
        }}
      >
        {columns.map((column, index) => {
          return (
            <Draggable key={index}>
              <Column
                column={column}
                onCardDrop={onCardDrop}
                onUpdateColumn={onUpdateColumn}
              />
            </Draggable>
          );
        })}
      </Container>
      <div className="add-new-container">
        {!openNewColumnForm ? (
          <div className="add-new-column" onClick={toggleNewColumn}>
            <i className="fa fa-plus icon" /> Add another column
          </div>
        ) : (
          <div className="form-input">
            <input
              type="text"
              placeholder="Enter column title..."
              className="input-new-column"
              ref={refInput}
              value={newColumnTitle}
              onChange={onNewColumnTitleChange}
              onKeyDown={(e) => e.key === "Enter" && addNewColumn()}
            />
            <div>
              <button onClick={addNewColumn} className="btn-add">
                Add column
              </button>
              <span className="cancle_column" onClick={toggleNewColumn}>
                X
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardContent;
