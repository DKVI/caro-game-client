import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/action";
let count = 0;
localStorage.setItem("break", "false");
const InfoBoard = () => {
  const dispatch = useDispatch();
  const isBreak = localStorage.getItem("break");
  const mode = useSelector((state) => state.mode);
  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(0);
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
    const newTimer = setTimeout(() => {
      if (isBreak === "true") {
        dispatch(action.setTime(time));
        clearTimeout(newTimer);
        return;
      }
      count++;
      setTime(count);
    }, 1000);
    return () => {
      clearTimeout(newTimer);
    };
  }, [time]);
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="game-info w-full rounded-3xl bg-white m-auto flex flex-col gap-3 p-6 overflow-hidden"
      style={{
        transition: "all 0.4s ease-in-out",
      }}
    >
      {mode === "CPU" && (
        <div className="flex gap-1 justify-center">
          <h1>MODE:</h1>
          <span>CPU</span>
        </div>
      )}
      <div>{formatTime(time)}</div>
      <div className="flex w-full justify-around">
        <button className="px-2 py-1 bg-red w-[40%] text-white rounded-md">
          back
        </button>
        <button className="px-2 py-1 bg-blue w-[40%] text-white rounded-md">
          save
        </button>
      </div>
    </motion.div>
  );
};

export default InfoBoard;
