import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppWrapper } from "./context/context.js";
import Board from "./components/Board";
import "./assets/css/App.css";

function App() {

  return (
    // context variables
    <AppWrapper>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <Board />
        </div>
      </DndProvider>
    </AppWrapper>
  );
}

export default App;
