import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SiAiqfome } from "react-icons/si";
import { SiApachespark } from "react-icons/si";
import { SiAngellist } from "react-icons/si";

export const GameUpdate = ({
  setArray,
  array,
  setCorrect,
  correct,
  setTries,
  tries,
  setFlip,
  setFirstClick,
}) => {
  const handlePlayAgain = () => {
    setCorrect([]);
    setFlip([]);
    setFirstClick("");
    setTries(0);
    setCongratsMessage(false);
    setArray(array.sort(() => Math.random() - 0.5));
  };

  const correctCount = correct.length / 2;

  const correctRate = ((correctCount * 100) / tries).toFixed(2);

  const [highestRecord, setHighestRecord] = useState(0);

  const [congratsMessage, setCongratsMessage] = useState(false);

  useEffect(() => {
    if (correct.length === 12 && correctRate > highestRecord) {
      setHighestRecord(correctRate);
      setCongratsMessage(true);
    }
  }, [correct]);

  return (
    <GameUpdateContainer>
      <GameUpdaters>
        <UpperDiv>
          <TriesCountWrapper>
            <SiAiqfome />
            Attempts: {tries}
          </TriesCountWrapper>
          <CorrectCountWrapper>
            <SiApachespark />
            Pairs: {correctCount}
          </CorrectCountWrapper>
          <CorrectRateWrapper>
            <SiAngellist />
            Success Rate: {tries === 0 ? "0.00" : correctRate}%
          </CorrectRateWrapper>
        </UpperDiv>

        <ButtomDiv>
          <CongratsMessageWrapper congratsMessage={congratsMessage}>
            Congratulations! You just set a new record !
          </CongratsMessageWrapper>

          <HighestRecordWrapper>
            Your highest Success Rate is now {highestRecord}% !
          </HighestRecordWrapper>
        </ButtomDiv>
      </GameUpdaters>
      <PlayAgainWrapper onClick={handlePlayAgain}>Play Again</PlayAgainWrapper>
    </GameUpdateContainer>
  );
};

const GameUpdateContainer = styled.div`
  display: flex;
  width: 800px;
  padding-bottom: 20px;

  @media all and (max-width: 1024px) {
    width: 600px;
  }

  @media all and (max-width: 768px) {
    width: 300px;
  }
`;

const GameUpdaters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  font-size: 20px;
  gap: 20px;
`;

const UpperDiv = styled.div``;

const TriesCountWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CorrectCountWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CorrectRateWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtomDiv = styled.div``;

const CongratsMessageWrapper = styled.div`
  visibility: ${({ congratsMessage }) =>
    congratsMessage ? "default" : "hidden"};
`;

const HighestRecordWrapper = styled.div``;

const PlayAgainWrapper = styled.div`
  color: #1b1b1b;
  box-shadow: 0 0 5px 2px white;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  height: 50px;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;

  @media all and (max-width: 768px) {
    font-size: 16px;
  }
`;
