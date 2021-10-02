import React, { useState, useEffect, useRef } from "react";
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
}) => {
  const handlePlayAgain = () => {
    setCorrect([]);
    setFlip([]);
    setTries(0);
    setCongratsMessage(false);
    setArray(array.sort(() => Math.random() - 0.5));
  };

  const correctCount = correct.length / 2;

  const correctRate = ((correctCount * 100) / tries).toFixed(2);

  const [congratsMessage, setCongratsMessage] = useState(false);

  const highestRecord = useRef(0);

  useEffect(() => {
    if (correct.length === 12) {
      if (correctRate > highestRecord.current) {
        highestRecord.current = correctRate;
        setCongratsMessage("Congratulations! You just set a new record");
      } else {
        setCongratsMessage("Unlucky! You will do better next time");
      }
    }
  }, [correct, correctRate]);

  return (
    <GameUpdateContainer>
      <GameUpdaters>
        <UpperDiv>
          <AttemptsCountWrapper>
            <SiAiqfome />
            Attempts: {tries}
          </AttemptsCountWrapper>
          <PairsCountWrapper>
            <SiApachespark />
            Pairs: {correctCount}
          </PairsCountWrapper>
          <SuccessRateWrapper>
            <SiAngellist />
            Success Rate: {tries === 0 ? "0.00" : correctRate}%
          </SuccessRateWrapper>
        </UpperDiv>

        <ButtomDiv>
          <CongratsMessageWrapper congratsMessage={congratsMessage}>
            {congratsMessage}!
          </CongratsMessageWrapper>

          <HighestRecordWrapper>
            Your highest Success Rate is now {highestRecord.current}% !
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

const AttemptsCountWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const PairsCountWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const SuccessRateWrapper = styled.div`
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
