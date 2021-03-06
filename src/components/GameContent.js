import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import a from "../images/a.jpg";
import b from "../images/b.jpg";
import c from "../images/c.jpg";
import d from "../images/d.jpg";
import e from "../images/e.jpg";
import f from "../images/f.jpg";
import { GameUpdate } from "./GameUpdate";

export default function GameContent() {
  const [array, setArray] = useState([a, d, f, b, e, c, a, d, b, f, e, c]);

  const [match, setMatch] = useState([]);

  const [flip, setFlip] = useState([]);

  const [correct, setCorrect] = useState([]);

  const [canClick, setCanClick] = useState(true);

  const [tries, setTries] = useState(0);

  const handleMatch = (value, index) => {
    setFlip((flipArray) => [...flipArray, index]);
    setMatch((matchArray) => [...matchArray, value]);
    if (flip.length === 1) {
      setCanClick(false);
      setTries(tries + 1);
    }
  };

  useEffect(() => {
    if (match.length < 2) return;
    if (match[0] === match[1] && flip[0] !== flip[1]) {
      setCorrect((correctArray) => [...correctArray, match[0], match[1]]);
    }

    if (match.length === 2) {
      setTimeout(() => setFlip([]), 1000);
      setMatch([]);
      setTimeout(() => setCanClick(true), 1000);
    }
  }, [flip, match]);

  return (
    <GameContentContainer>
      <ImagesContainer>
        {array.map((value, index) => (
          <ImageWrapper
            onClick={
              canClick && !correct.includes(value) && !flip.includes(index)
                ? () => handleMatch(value, index)
                : undefined
            }
            correct={correct}
            value={value}
            index={index}
            flip={flip}
            key={index}
          >
            <CardHolder>
              <CardBack value={value} correct={correct} />
              <CardFront value={value} correct={correct}>
                <PokemonCard src={value} alt="Pokemon" />
              </CardFront>
            </CardHolder>
          </ImageWrapper>
        ))}
      </ImagesContainer>
      <GameUpdate
        setArray={setArray}
        array={array}
        setCorrect={setCorrect}
        correct={correct}
        setTries={setTries}
        tries={tries}
        setFlip={setFlip}
      />
    </GameContentContainer>
  );
}

const GameContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 1500px;
`;

const ImagesContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 800px;
  padding-top: 60px;
  padding-bottom: 8vh;
  gap: 20px;

  @media all and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 0px;
  }

  @media all and (max-width: 768px) {
    gap: 15px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  height: 200px;
  width: 200px;
  border-radius: 10px;
  box-shadow: 0 0 10px 1px white;
  cursor: ${({ correct, value, flip, index }) =>
    correct.includes(value) || flip.includes(index) || flip.length === 2
      ? "default"
      : "pointer"};
  transform-style: preserve-3d;
  transition: 0.6s cubic-bezier(0.38, 0.02, 0.09, 1.66) all;

  ${({ flip, index }) =>
    flip.includes(index) &&
    css`
      transform: rotateY(180deg);
    `};

  @media all and (max-width: 768px) {
    height: 70px;
    width: 70px;
  }
`;

const CardHolder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: 0.6s cubic-bezier(0.38, 0.02, 0.09, 1.66) all;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: #6af776;
  border-radius: 5px;
  visibility: ${({ correct, value }) =>
    correct.includes(value) ? "hidden" : "default"};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transform: rotateY(180deg);
  ${({ correct, value }) =>
    correct.includes(value)
      ? css`
          -webkit-backface-visibility: default;
          backface-visibility: default;
        `
      : css`
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        `};
`;

const PokemonCard = styled.img`
  border-radius: 5px;
  height: 100%;
  width: 100;
`;
