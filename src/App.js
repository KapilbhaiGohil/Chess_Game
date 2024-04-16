import { useContext } from "react";
import Chess from "./Components";
import { ChessContext, ChessContextProvider } from "./Context";
import './chess.scss'
function App() {
  const {turn} = useContext(ChessContext)
  return (
    <>
          <div style={turn=='a'? {background:"#276982"}:{background:"#8c7134"}} className="chess">
              <Chess/>
          </div>
    </>
  );
}

export default App;
