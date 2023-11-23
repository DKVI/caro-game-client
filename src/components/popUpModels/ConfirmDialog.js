import { UseSelector, useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, memo, useState } from "react";
import SpinnerLoading from "../loading";
import * as API from "../../axios/API/index";
import * as action from "../../redux/action";

const ConfirmDialog = memo(({ callback, msg, action, time }) => {
  const boardData = useSelector((state) => state.data);
  const [pending, setPending] = useState(false);
  const nextMove = useSelector((state) => state.next_move);
  const player2Name = useSelector((state) => state.player2);
  const startTime = useSelector((state) => state.start_times);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const player2NameParams = searchParams.get("2PlayerName");
  const modeParam = searchParams.get("mode");
  const idParam = searchParams.get("id");
  const navigate = useNavigate();
  function doneGame() {
    setPending(true);
    API.findGame(idParam)
      .then((res) => {
        if (res.data.game.length === 0) {
          API.addGameData({
            ID: idParam,
            opponent_name: player2NameParams ? player2NameParams : "CPU",
            score: 0,
            game_type: modeParam,
            difficulty: 0,
            play_time: time,
            start_time: startTime,
            status: "pending",
            data: JSON.stringify({ ...boardData }),
            nextmove: nextMove,
          })
            .then((res) => {
              alert("Save successfully! press Enter to return to Dashboard");
              setPending(false);
              navigate("/Dashboard");
              console.log(res);
            })
            .catch((err) => {
              alert("Save error!");
              console.log(err);
            });
        } else {
          API.updateGame(idParam, {
            opponent_name: player2NameParams ? player2NameParams : "CPU",
            score: 0,
            game_type: modeParam,
            difficulty: 0,
            play_time: time,
            start_time: startTime,
            status: "pending",
            data: JSON.stringify({ ...boardData }),
            nextmove: nextMove,
          })
            .then((res) => {
              alert("Save successfully! press Enter to return to Dashboard");
              setPending(false);
              navigate("/Dashboard");
              console.log(res);
            })
            .catch((err) => {
              alert("Save error!");
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("re-render");
  return (
    <div
      className="w-screen fixed top-[60px] left-0 bottom-0 right-0 flex"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <motion.div
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        className="w-[350px] bg-white rounded-md m-auto"
      >
        <div className="w-full h-[50px] border-b-2 px-2 py-1 flex justify-between items-center">
          <div>Confirm</div>
          <div
            onClick={() => {
              callback();
            }}
            className="py-1 px-2 hover:bg-light hover:text-white cursor-pointer text-[16px]"
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          >
            &times;
          </div>
        </div>
        <div className="p-3 flex flex-col gap-5">
          <div className="text-left">{msg}</div>
          <div className="flex justify-end gap-2">
            <button
              className="px-2 py-1 bg-red text-white hover:opacity-[0.6]"
              onClick={() => {
                callback();
              }}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 bg-blue text-white hover:opacity-[0.6]"
              onClick={() => {
                if (action === "save") {
                  doneGame();
                }
              }}
            >
              Accept
            </button>
          </div>
        </div>
        {pending && <SpinnerLoading />}
      </motion.div>
    </div>
  );
});

export default ConfirmDialog;
