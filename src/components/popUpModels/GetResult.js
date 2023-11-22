import { UseSelector, useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, memo, useState } from "react";
import SpinnerLoading from "../loading";
import * as API from "../../axios/API/index";
import * as action from "../../redux/action";
const GetResult = (props) => {
  const result = props.result;
  console.log(props.uncomplete);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idParam = searchParams.get("id");
  const player2Name = useSelector((state) => state.player2);
  const time = useSelector((state) => state.time);
  const mode = useSelector((state) => state.mode);
  const startTime = useSelector((state) => state.start_times);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  function doneGame(target) {
    setPending(true);
    API.findGame(idParam)
      .then((res) => {
        if (res.data.game.length === 0) {
          API.addGameData({
            ID: idParam,
            opponent_name: player2Name,
            score: result === "1" ? 100 : -50,
            game_type: mode,
            difficulty: 0,
            play_time: time,
            start_time: startTime,
            status: "done",
            data: "{}",
            nextmove: null,
          }).then(() => {
            setPending(false);
            navigate(target);
          });
        } else {
          API.updateGame(idParam, {
            opponent_name: player2Name,
            score: result === "1" ? 100 : -50,
            game_type: mode,
            difficulty: 0,
            play_time: time,
            start_time: startTime,
            status: "done",
            data: "{}",
            nextmove: null,
          }).then(() => {
            setPending(false);
            navigate(target);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      {time !== 0 ? (
        <motion.div
          className="w-screen h-[calc(100vh-60px)] flex"
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <div
            className="w-[300px] bg-white m-auto rounded-3xl relative py-3 px-6 text-center flex"
            style={{
              boxShadow: "3px 3px 3px black",
            }}
          >
            <div className="flex  flex-col w-full justify-end gap-3">
              {result === "1" ? (
                player2Name === "CPU" ? (
                  <div className="font-bold text-red text-2xl">YOU WIN!</div>
                ) : (
                  <div className="font-bold text-red text-2xl">YOU WIN!</div>
                )
              ) : player2Name !== "CPU" ? (
                <div className="font-bold text-green text-2xl">
                  {player2Name} WIN!
                </div>
              ) : (
                <div className="font-bold text-green text-2xl">YOU LOSE!</div>
              )}

              <div>Mode: play with {mode}</div>
              <div>Play times: {formatTime(time)}</div>
              <div>Score: {result === "1" ? 100 : -50}</div>
              <div className="flex justify-around gap-3">
                <div
                  className="px-2 py-1 bg-red text-white font-bold rounded-md hover:opacity-[0.6] home-btn cursor-pointer"
                  onClick={() => {
                    doneGame("/dashboard");
                  }}
                >
                  HOME
                </div>
                <div
                  className="px-2 py-1 bg-blue text-white font-bold rounded-md hover:opacity-[0.6] replay-btn cursor-pointer"
                  onClick={() => {
                    doneGame("/game");
                  }}
                >
                  REPLAY
                </div>
              </div>
            </div>
          </div>
          {pending && <SpinnerLoading />}
        </motion.div>
      ) : (
        <SpinnerLoading />
      )}
    </>
  );
};

export default GetResult;
