import { useState, useEffect, useMemo } from "react";
import { delay, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/action";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "./popUpModels/ConfirmDialog";
localStorage.setItem("break", "false");
const InfoBoard = ({ playTime }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const player2NameParams = searchParams.get("2PlayerName");
  const modeParam = searchParams.get("mode");
  const dispatch = useDispatch();
  const isBreak = localStorage.getItem("break");
  const [time, setTime] = useState(playTime ? Number.parseInt(playTime) : 0);
  const [showConfirm, SetShowConfirm] = useState(false);
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  useEffect(() => {
    console.log(time);
  }, []);
  let newTimer = setTimeout(() => {}, 1000);
  const hideConfirmDialog = () => {
    SetShowConfirm(false);
  };
  useEffect(() => {
    console.log(time);
    newTimer = setTimeout(() => {
      if (isBreak === "true") {
        console.log(true);
        dispatch(action.setTime(time));
        clearTimeout(newTimer);
        return;
      } else {
        setTime((prev) => prev + 1);
      }
    }, 1000);
    return () => {
      clearTimeout(newTimer);
    };
  }, [time]);
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{
        ease: "linear",
        duration: 0.5,
      }}
      className="game-info w-full rounded-3xl bg-white m-auto flex flex-col gap-3 p-6 overflow-hidden"
      style={{}}
    >
      {modeParam === "CPU" && (
        <div className="flex gap-1 justify-center">
          <h1>MODE:</h1>
          <span>CPU</span>
        </div>
      )}
      {modeParam === "2Player" && (
        <div className="flex gap-1 justify-center">
          <h1>
            MODE: Play with {player2NameParams ? player2NameParams : "CPU"}
          </h1>
        </div>
      )}
      <div>{formatTime(time)}</div>
      <div className="flex w-full justify-around">
        <button
          className="px-2 py-1 bg-red w-[40%] text-white rounded-md"
          onClick={() => {
            return navigate("/game");
          }}
        >
          back
        </button>
        <button
          className="px-2 py-1 bg-blue w-[40%] text-white rounded-md"
          onClick={() => {
            SetShowConfirm(true);
            dispatch(action.isBreak(true));
          }}
        >
          save
        </button>
      </div>
      {showConfirm && (
        <ConfirmDialog
          msg={"Do you want to save this game?"}
          action={"save"}
          callback={hideConfirmDialog}
          time={time}
        />
      )}
    </motion.div>
  );
};

export default InfoBoard;
