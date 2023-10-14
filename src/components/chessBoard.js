import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as icon from "../icon";
const ChessBoard = () => {
  let i = -1;
  let j = -1;
  const xColor = useSelector((state) => state.xColor);
  const oColor = useSelector((state) => state.oColor);
  const indexArray = [];
  const X = icon.X;
  const O = icon.O;
  const [insertMove, setInsertMove] = useState("X");
  const [next, setNext] = useState(0);
  useEffect(() => {
    const boardElements = document.querySelectorAll(".board-element");
    boardElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        console.log(e.target);
        if (e.target.innerHTML === "") {
          if (insertMove === "X") {
            e.target.innerHTML = `<div class="w-full h-full m-auto color-${xColor}"> X</div>`;
            setInsertMove("O");
            return;
          } else {
            e.target.innerHTML = `<div class="w-full h-full m-auto color-${oColor}"> O</div>`;
            setInsertMove("X");
            return;
          }
        }
      });
    });
  }, []);
  return (
    <div
      className="w-[calc(100vh-200px)] h-[calc(100vh-200px)]"
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
              className={
                "w-full h-full bg-white flex board-element " + `${xColor}`
              }
              id={`${i}-${j++}`}
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
