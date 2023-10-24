import { UseSelector, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import SpinnerLoading from "../loading";
const GetResult = (props) => {
  const result = props.result;
  console.log(result);
  const time = useSelector((state) => state.time);
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  useEffect(() => {}, []);
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
                <div className="font-bold text-red text-2xl">YOU WIN!</div>
              ) : (
                <div className="font-bold text-green text-2xl">YOU LOSE!</div>
              )}
              <div>Mode: {"play with CPU"}</div>
              <div>Play times: {formatTime(time)}</div>
              <div>Score: {3232}</div>
              <div className="flex justify-around gap-3">
                <Link
                  to="/dashboard"
                  className="px-2 py-1 bg-red text-white font-bold rounded-md hover:opacity-[0.6]"
                >
                  HOME
                </Link>
                <Link className="px-2 py-1 bg-blue text-white font-bold rounded-md hover:opacity-[0.6]">
                  REPLAY
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <SpinnerLoading />
      )}
    </>
  );
};

export { GetResult };
