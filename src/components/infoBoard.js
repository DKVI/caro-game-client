import { useState, useEffect, useMemo } from "react";
import { delay, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/action";
import { useLocation, useNavigate } from "react-router-dom";
localStorage.setItem("break", "false");
let count = 0;
const InfoBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modeParam = searchParams.get("mode");
  const dispatch = useDispatch();
  const isBreak = localStorage.getItem("break");
  const player2Name = useSelector((state) => state.player2);
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
      console.log(time);
      setTime(count);
    }, 1000);
    return () => {
      clearTimeout(newTimer);
    };
  }, [time]);
  useEffect(() => {
    count = 0;
  }, []);
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
          <h1>MODE: Play with {player2Name}</h1>
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
        <button className="px-2 py-1 bg-blue w-[40%] text-white rounded-md">
          save
        </button>
      </div>
    </motion.div>
  );
};

export default InfoBoard;
