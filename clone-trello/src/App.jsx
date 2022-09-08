import "./App.scss";
// Custom component
import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardContent from "components/BoardContent/BoardContent";

function App() {
  return (
    <div className="app-trello-quypham">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;
