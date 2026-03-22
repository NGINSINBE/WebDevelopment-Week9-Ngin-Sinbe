import Header from "./components/Header.jsx";
import Game from "./components/Game.jsx";
import "./index.css";

function App() {
  return (
    <div>
      <Header gameName="Monster Slayer" />
      <Game />
    </div>
  );
}

export default App;
