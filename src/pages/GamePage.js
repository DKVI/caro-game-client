import React, { useEffect, useState } from "react";
import * as authen from "../authentication/index";
import SpinnerLoading from "../components/loading";
import Header from "../components/header/Header";
import lightGif from "../assets/images/light.gif";
import darkGif from "../assets/images/dark.gif";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChessBoard from "../components/chessBoard";
import { motion } from "framer-motion";
import * as icon from "../icon";
import { v4 as uuidv4 } from "uuid";
import InfoBoard from "../components/infoBoard";
import * as action from "../redux/action";
let id = null;
let isBreak = false;
const GamePage = () => {
  const tempData = JSON.parse(localStorage.getItem("data"));
  localStorage.setItem("break", "false");
  const theme = useSelector((state) => state.theme);
  const [color, setColor] = useState("day");
  const location = useLocation();
  const CPUMode = icon.HiOutlineDesktopComputer;
  const P2Mode = icon.LiaUserFriendsSolid;
  const searchParams = new URLSearchParams(location.search);
  const idParam = searchParams.get("id");
  const modeParam = searchParams.get("mode");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [mode, setMode] = useState("");
  const gif = useSelector((state) => state.background);
  const [p2Input, setP2Input] = useState("");
  const [gifBackground, setGifBackground] = useState(
    gif === "light.gif" ? lightGif : darkGif
  );
  function clearTemp() {
    localStorage.removeItem("data");
  }
  useEffect(() => {
    if (!authen.isLogin()) {
      return navigate("/login");
    }
    console.log(JSON.parse(localStorage.getItem("data")));
    dispatch(action.setTime(0));
  }, []);

  useEffect(() => {
    setMode((prev) => {
      prev = null;
      return prev;
    });
    console.log(modeParam, idParam);
  }, [modeParam]);
  useEffect(() => {
    console.log(color);
  }, [color]);
  useEffect(() => {
    console.log(gif);
    setGifBackground(gif === "light.gif" ? lightGif : darkGif);
    setColor(gif === "light.gif" ? "day" : "night");
  }, [gif]);
  useEffect(() => {
    function goToCPUMode() {
      id = uuidv4();
      dispatch(action.setPlayer2Name("CPU"));
      return navigate(`/game?mode=CPU&id=${id}`);
    }
    function goTo2PlayerMode() {
      return navigate("/game?mode=2Player");
    }
    if (mode === "CPU") {
      goToCPUMode();
    } else if (mode === "2Player") {
      goTo2PlayerMode();
    }
  }, [mode]);
  useEffect(() => {
    console.log(mode);
  }, [mode]);
  const create2PlayerMode = () => {
    id = uuidv4();
    return navigate(`/game?mode=2Player&2PlayerName=${p2Input}&id=${id}`);
  };

  return !authen.isLogin ? (
    <SpinnerLoading />
  ) : (
    <div className="w-full h-full">
      <Header />
      <div
        className="w-full h-[calc(100vh-60px)] flex justify-center items-center px-[64px]"
        style={{
          backgroundImage: `url(${gifBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {idParam && modeParam === "CPU" && !tempData ? (
          <>
            <div className="w-1/5 h-full"></div>
            <div className="w-3/5 h-full flex">
              <div className="m-auto w-[70%] pt-[70%] relative">
                <ChessBoard />
              </div>
            </div>
            <div className="w-1/5 h-full flex">
              <InfoBoard />
            </div>
          </>
        ) : null}
        {idParam && modeParam && tempData ? (
          <>
            <div className="w-1/5 h-full"></div>
            <div className="w-3/5 h-full flex">
              <div className="m-auto w-[70%] pt-[70%]  relative">
                <ChessBoard
                  dataBoard={JSON.parse(tempData.DATA)}
                  nextMove={tempData.NEXTMOVE}
                />
              </div>
            </div>
            <div className="w-1/5 h-full flex">
              <InfoBoard playTime={tempData.PLAY_TIME} />
            </div>
          </>
        ) : null}
        {idParam && modeParam === "2Player" && !tempData ? (
          <>
            <div className="w-1/5 h-full"></div>
            <div className="w-3/5 h-full flex">
              <div className="m-auto w-[70%] pt-[70%]  relative">
                <ChessBoard />
              </div>
            </div>
            <div className="w-1/5 h-full flex">
              <InfoBoard />
            </div>
          </>
        ) : null}
        {!idParam && modeParam === "2Player" && !tempData ? (
          <div className="w-full h-full flex">
            <motion.div
              className="m-auto bg-white w-1/3 px-3 p-6 flex-col flex gap-4"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                type: "spring",
              }}
            >
              <div
                className="w-full font-bold"
                style={{
                  filter: "drop-shadow(2px 4px 1px #cccc)",
                }}
              >
                INPUT PLAYER 2'S NAME!
              </div>
              <div className="w-full">
                <motion.input
                  initial={{ width: "80%" }}
                  animate={{ width: "100%" }}
                  className={`w-full px-2 py-1 outline-none border-[4px] border-solid ${
                    theme === "night" ? "border-night" : "border-light"
                  }`}
                  value={p2Input}
                  onChange={(e) => {
                    setP2Input(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex justify-between gap-6">
                <button
                  className="px-2 py-1 bg-light text-white w-[50%] rounded-lg"
                  onClick={() => {
                    setMode((prev) => {
                      prev = null;
                      return prev;
                    });
                    return navigate("/game");
                  }}
                >
                  BACK
                </button>
                <button
                  className="px-2 py-1 bg-blue text-white w-[50%] rounded-lg"
                  onClick={() => {
                    dispatch(
                      action.setPlayer2Name(
                        document.querySelector("input").value
                      )
                    );
                    dispatch(action.setMode("2Player"));
                    create2PlayerMode();
                  }}
                >
                  PLAY
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
        {!idParam && modeParam === null ? (
          <motion.div
            className="w-full h-full flex"
            style={{
              transition: "all 0.1s ease-in-out",
            }}
          >
            <motion.div
              className="m-auto bg-white w-1/3 px-3 p-6 flex-col rounded-xl"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                type: "spring",
              }}
            >
              <h1
                className="font-bold text-3xl mb-[20px]"
                style={{
                  filter: "drop-shadow(2px 4px 1px #cccc)",
                }}
              >
                MODE SELECTION
              </h1>
              <div className="flex justify-around mb-[20px]">
                <div
                  className={`font-bold ${
                    theme === "night" ? "text-dark" : "text-light"
                  }`}
                >
                  WITH CPU
                </div>
                <div
                  className={`font-bold ${
                    theme === "night" ? "text-dark" : "text-light"
                  }`}
                >
                  WITH PLAYER 2
                </div>
              </div>
              <div
                className="flex gap-4 justify-around"
                style={{
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                  }}
                  className={`w-[40%] flex border-[10px] cursor-pointer border-black ${
                    color === "night" ? "hover-dark" : "hover-light"
                  } hover:border-none hover:p-[10px] hover:rounded-xl hover:text-white`}
                  style={{
                    boxShadow: "5px 5px 5px #cccc",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onClick={() => {
                    setMode((prev) => {
                      prev = "CPU";
                      return prev;
                    });
                  }}
                >
                  <CPUMode className="m-auto " style={{}} size={100} />
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.2,
                  }}
                  className={`w-[40%] flex border-[10px] cursor-pointer border-black ${
                    color === "night" ? "hover-dark" : "hover-light"
                  } hover:border-none hover:p-[10px] hover:rounded-xl hover:text-white`}
                  style={{
                    boxShadow: "5px 5px 5px #cccc",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onClick={() => {
                    setMode((prev) => {
                      prev = "2Player";
                      return prev;
                    });
                  }}
                >
                  <P2Mode className="m-auto " style={{}} size={100} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </div>{" "}
    </div>
  );
};

export default GamePage;
