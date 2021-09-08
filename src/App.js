import styled from "styled-components";
import GameContent from "./components/GameContent";

function App() {
  return (
    <MemoryGame>
      <GameContent />
    </MemoryGame>
  );
}

export default App;

const MemoryGame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: auto;
  width: 100%;
  /* background-color: #aee9eb; */
  background: radial-gradient(#aee9eb, #68b4f2);
`;
