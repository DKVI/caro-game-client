import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import initializeBoard from "../rules/initBoard";
import { findBestMove, makeMove } from "../rules/nextMove";
import getWinner from "../rules/checkWinner";
import { GetResult } from "./popUpModels";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import * as action from "../redux/action";
let board = initializeBoard(15);
const ChessBoard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idParam = searchParams.get("id");
  const modeParam = searchParams.get("mode");
  const theme = useSelector((state) => state.theme);
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
  const [winner, setWinner] = useState(0);
  function isPlace(e) {
    return e.target.innerHTML ? false : true;
  }
  function setAIMove(e) {
    const { row, col } = findBestMove(1, board);
    const element = document.getElementById(`${row}_${col}`);
    board[row][col] = -1;
    element.innerHTML = `<div class="m-auto font-bold ${oColor} o-element shadow-custom text-lg">O</div>`;
    // setCurrentPlayer((prev) => {
    //   prev = -1;
    //   const winnerPlayer = getWinner(board, prev);
    //   console.log(winnerPlayer);
    //   if (winnerPlayer !== 0) {
    //     localStorage.setItem("break", "true");
    //     setWinner((prev) => {
    //       prev = winnerPlayer;
    //       return prev;
    //     });
    //   }
    //   return prev;
    // });
  }
  function setMove(e) {
    let id = e.target.id;
    let [i, j] = id.split("_");
    console.log(i, j);
    if (insertMove === "X") {
      e.target.innerHTML = `<div class="m-auto font-bold ${xColor} x-element shadow-custom text-lg">X</div>`;
      board[i][j] = 1;
      // setCurrentPlayer((prev) => {
      //   prev = 1;
      //   const winnerPlayer = getWinner(board, prev);
      //   console.log(winnerPlayer);
      //   if (winnerPlayer !== 0) {
      //     localStorage.setItem("break", "true");

      //     setWinner((prev) => {
      //       prev = winnerPlayer;
      //       return prev;
      //     });
      //   }
      //   return prev;
      // });
    }
  }
  function changeTurnAndCheck(turn) {
    setCurrentPlayer((prev) => {
      prev = turn;
      const winnerPlayer = getWinner(board, prev);
      if (winnerPlayer !== 0) {
        localStorage.setItem("break", "true");
        setWinner((prev) => {
          prev = winnerPlayer;
          return prev;
        });
      }
      console.log(prev);
      return prev;
    });
  }
  useEffect(() => {
    setXColor(theme === "night" ? "xDarkColor" : "xLightColor");
    setOColor(theme === "night" ? "oDarkColor" : "oLightColor");
    const xElements = document.querySelectorAll(".x-element");
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1.2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                opacity: 1,
              }}
              key={index}
              className={`w-full h-full bg-white flex board-element ease-in-out] cursor-pointer`}
              onClick={(e) => {
                if (!isPlace(e)) return;
                setMove(e);
                changeTurnAndCheck(1);
                setAIMove(e);
                changeTurnAndCheck(-1);
              }}
              id={`${i}_${j++}`}
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                transition: "all 0.5s ease-in-out",
              }}
            ></motion.div>
          );
        })}
      {winner !== 0 && <GetResult result={`${winner}`} mode={`${modeParam}`} />}
    </div>
  );
};

export default ChessBoard;
