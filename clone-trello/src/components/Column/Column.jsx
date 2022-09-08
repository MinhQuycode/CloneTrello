import Task from "components/Task/Task";
import React from "react";

import "./Column.scss";

const Column = () => {
  return (
    <div className="column">
      <header>Brainstorm</header>
      <ul className="task-list">
        <Task />
        <li className="task-item">Add what you like to work ?</li>
        <li className="task-item">Add what you like to work ?</li>
        <li className="task-item">Add what you like to work ?</li>
        <li className="task-item">Add what you like to work ?</li>
      </ul>
      <footer>Add another card</footer>
    </div>
  );
};

export default Column;
