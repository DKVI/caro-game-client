import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import initializeBoard from "../rules/initBoard";
import { findBestMove, makeMove } from "../rules/nextMove";
import getWinner from "../rules/checkWinner";
let board = initializeBoard(15);

const ChessBoard = () => {
  const theme = useSelector((state) => state.theme);
  console.log(theme);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [xColor, setXColor] = useState(
    theme === "night" ? "xDarkColor" : "xLightColor"
  );
  const [oColor, setOColor] = useState(
    theme === "night" ? "oDarkColor" : "oLightColor"
  );
  let i = -1;
  let j = -1;

  const [insertMove, setInsertMove] = useState("X");
  useEffect(() => {});
  function setMove(e) {
    let id = e.target.id;
    let [i, j] = id.split("_");
    console.log(i, j);
    if (insertMove === "X") {
      e.target.innerHTML = `<div class="m-auto font-bold ${xColor} x-element shadow-custom text-lg">X</div>`;
      board[i][j] = 1;
      setCurrentPlayer((prev) => {
        prev = 1;
        console.log(getWinner(board, prev));
        return prev;
      });
    }
  }
  function handlePlay(e) {
    const id = e.target.id;
    console.log(id);
  }
  useEffect(() => {
    setXColor(theme === "night" ? "xDarkColor" : "xLightColor");
    setOColor(theme === "night" ? "oDarkColor" : "oLightColor");
    const xElements = document.querySelectorAll(".x-element");
    console.log(xElements);
    Array.from(xElements).forEach((element) => {
      if (element.classList.contains("xDarkColor")) {
        element.classList.remove("xDarkColor");
        element.classList.add("xLightColor");
      } else if (element.classList.contains("xLightColor")) {
        element.classList.remove("xLightColor");
        element.classList.add("xDarkColor");
      }
    });
    const oElements = document.querySelectorAll(".o-element");
    Array.from(oElements).forEach((element) => {
      if (element.classList.contains("oDarkColor")) {
        element.classList.remove("oDarkColor");
        element.classList.add("oLightColor");
      } else if (element.classList.contains("oLightColor")) {
        element.classList.remove("oLightColor");
        element.classList.add("oDarkColor");
      }
    });
  }, [theme]);
  useEffect(() => {
    console.log(insertMove);
  }, [insertMove]);
  return (
    <div
      className="w-[calc(100vh-150px)] h-[calc(100vh-150px)]"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(15, 1fr)",
        gridTemplateRows: "repeat(15, 1fr)",
        gap: "5px",
      }}
    >
      {Array(225)
        .fill(0)
        .map((item, index) => {
          if (index % 15 === 0) {
            i++;
            j = 0;
          }
          return (
            <div
              key={index}
              className={"w-full h-full bg-white flex board-element"}
              onClick={(e) => {
                setMove(e);
                handlePlay(e);
                console.log(board);
                const { row, col } = findBestMove(1, board);
                const element = document.getElementById(`${row}_${col}`);
                console.log(element);
                board[row][col] = -1;
                element.innerHTML = `<div class="m-auto font-bold ${oColor} o-element shadow-custom text-lg">O</div>`;
                setCurrentPlayer((prev) => {
                  prev = -1;
                  console.log(getWinner(board, prev));
                  return prev;
                });
              }}
              id={`${i}_${j++}`}
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            ></div>
          );
        })}
    </div>
  );
};

export default ChessBoard;
