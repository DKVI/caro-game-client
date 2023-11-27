import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import initializeBoard from "../rules/initBoard";
import { findBestMove } from "../rules/nextMove";
import getWinner from "../rules/checkWinner";
import GetResult from "./popUpModels/GetResult";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import * as action from "../redux/action";
import utils from "../utils";
import * as API from "../axios/API/index";
let board = null;
const initTime = false;
const ChessBoard = (props) => {
  const location = useLocation();
  const { dataBoard, nextMove } = props;
  const searchParams = new URLSearchParams(location.search);
  const idParam = searchParams.get("id");
  const dispatch = useDispatch();
  const player2Name = useSelector((state) => state.player2);
  const start_time = useSelector((state) => state.start_times);
  const modeParam = searchParams.get("mode");
  const theme = useSelector((state) => state.theme);
  const [currentPlayer, setCurrentPlayer] = useState(nextMove ? nextMove : 1);
  const [showResult, setShowResult] = useState(initTime);
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
    element.innerHTML = `<div class="m-auto font-bold ${oColor} o-element shadow-custom text-lg text-[14px] absolute" style="transform: translate(-50%, -50%); top: 50%; left: 50%;">
    O
  </div>`;
  }

  function setMoveX(e) {
    let id = e.target.id;
    let [i, j] = id.split("_");
    console.log(i, j);
    if (insertMove === "X") {
      e.target.innerHTML = `<div class="m-auto font-bold ${xColor} x-element shadow-custom text-lg text-[14px] absolute" style="transform: translate(-50%, -50%); top: 50%; left: 50%;">
      X
    </div>`;
      board[i][j] = 1;
    }
  }

  function setMove(e) {
    console.log(currentPlayer);
    let id = e.target.id;
    let [i, j] = id.split("_");
    console.log(i, j);
    if (currentPlayer === 1) {
      e.target.innerHTML = `<div class="m-auto font-bold ${xColor} x-element shadow-custom text-lg text-[14px] absolute" style="transform: translate(-50%, -50%); top: 50%; left: 50%;">
      X
    </div>`;
      board[i][j] = 1;
      changeTurnAndCheck(1);
      setCurrentPlayer((prev) => {
        prev = -1;
        return prev;
      });
    } else if (currentPlayer === -1) {
      e.target.innerHTML = `<div class="m-auto font-bold ${oColor} o-element shadow-custom text-lg text-[14px] absolute" style="transform: translate(-50%, -50%); top: 50%; left: 50%;">
      O
    </div>`;
      board[i][j] = -1;
      changeTurnAndCheck(-1);
      setCurrentPlayer((prev) => {
        prev = 1;
        return prev;
      });
    }
  }

  function changeTurnAndCheck(turn) {
    let winnerLocal = 0;
    setCurrentPlayer((prev) => {
      prev = turn;
      const winnerPlayer = getWinner(board, prev);
      if (winnerPlayer !== 0) {
        winnerLocal = turn;
        if (turn === 1) {
          dispatch(action.setScore(100));
        } else {
          dispatch(action.setScore(-50));
        }
        console.log(winnerPlayer);
        localStorage.setItem("break", "true");
        setWinner((prev) => {
          prev = winnerPlayer;
          return prev;
        });
      }
      console.log(prev);
      return prev;
    });
    return winnerLocal;
  }
  const fillBoardElement = () => {
    console.log(xColor, oColor);
    for (let element in dataBoard) {
      Array.from(dataBoard[element]).forEach((item, index) => {
        if (item === 1) {
          document.getElementById(
            `${element}_${index}`
          ).innerHTML = `<div class="m-auto font-bold ${xColor} x-element shadow-custom text-lg">X</div>`;
        } else if (item === -1) {
          console.log(xColor);
          document.getElementById(
            `${element}_${index}`
          ).innerHTML = `<div class="m-auto font-bold ${oColor} o-element shadow-custom text-lg">O</div>`;
        }
      });
    }
  };
  useEffect(() => {
    dispatch(action.setId(idParam));
    console.log(utils.createTimeStamp());
    dispatch(action.setStartTime(utils.createTimeStamp()));
  }, [idParam, modeParam]);
  useEffect(() => {
    setWinner(0);
    board = dataBoard ? dataBoard : initializeBoard(15);
    if (dataBoard) {
      fillBoardElement();
    }
    dispatch(action.setMode(modeParam));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setShowResult(true);
    }, 2000);
  }, [winner]);
  useEffect(() => {
    console.log("theme change");
    console.log(theme);
    setXColor(theme === "night" ? "xDarkColor" : "xLightColor");
    setOColor(theme === "night" ? "oDarkColor" : "oLightColor");
    const xElements = document.querySelectorAll(".x-element");
    const oElements = document.querySelectorAll(".o-element");
    if (theme === "day") {
      Array.from(xElements).forEach((element) => {
        element.classList.remove("xDarkColor");
        element.classList.add("xLightColor");
      });
      Array.from(oElements).forEach((element) => {
        element.classList.remove("oDarkColor");
        element.classList.add("oLightColor");
      });
    } else {
      Array.from(xElements).forEach((element) => {
        element.classList.remove("xLightColor");
        element.classList.add("xDarkColor");
      });
      Array.from(oElements).forEach((element) => {
        element.classList.remove("oLightColor");
        element.classList.add("oDarkColor");
      });
    }
  }, [theme]);

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0"
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
                scale: [1, 0.5, 0.5, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "50%", "50%", "50%", "20%"],
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
              key={index}
              className={`w-full h-full bg-white flex board-element ease-in-out] cursor-pointer overflow-hidden relative`}
              onClick={(e) => {
                if (modeParam === "CPU") {
                  if (!isPlace(e)) return;
                  setMoveX(e);
                  if (changeTurnAndCheck(1) === 1) return;
                  setAIMove(e);
                  if (getWinner(board, -1) === -1) {
                    changeTurnAndCheck(-1);
                  }
                  dispatch(action.setDataBoard({ board, nextMove: 1 }));
                } else if (modeParam === "2Player") {
                  setMove(e);
                  console.log(currentPlayer);
                  dispatch(
                    action.setDataBoard({ board, nextMove: -currentPlayer })
                  );
                }
              }}
              id={`${i}_${j++}`}
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                transition: "all 0.5s ease-in-out",
              }}
            ></motion.div>
          );
        })}
      {winner !== 0 && showResult && (
        <GetResult
          uncomplete={dataBoard ? idParam : null}
          result={`${winner}`}
          mode={`${modeParam}`}
        />
      )}
    </div>
  );
};

export default ChessBoard;
