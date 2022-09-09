import Column from "components/Column/Column";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import "./BoardContent.scss";
import { initialData } from "actions/initData";
import { mapOrder } from "utils/sort";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

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

  if (isEmpty(board)) {
    return <div className="not-found">Board not found!</div>;
  }

  return (
    <div className="board-contents">
      {columns.map((column, index) => {
        return <Column key={index} column={column} />;
      })}
    </div>
  );
};

export default BoardContent;
