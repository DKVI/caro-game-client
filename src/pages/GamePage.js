import React, { useEffect, useState } from "react";
import * as authen from "../authentication/index";
import SpinnerLoading from "../components/loading";
import Header from "../components/header/Header";
import lightGif from "../assets/images/light.gif";
import darkGif from "../assets/images/dark.gif";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ChessBoard from "../components/chessBoard";
import { GetResult } from "../components/popUpModels";
import { motion } from "framer-motion";
import * as icon from "../icon";
import { v4 as uuidv4 } from "uuid";
import InfoBoard from "../components/infoBoard";
let id = null;
let isBreak = false;
const GamePage = () => {
  const theme = useSelector((state) => state.theme);
  const [color, setColor] = useState("night");
  const location = useLocation();
  const CPUMode = icon.HiOutlineDesktopComputer;
  const P2Mode = icon.LiaUserFriendsSolid;
  const searchParams = new URLSearchParams(location.search);
  const idParam = searchParams.get("id");
  const modeParam = searchParams.get("mode");
  let navigate = useNavigate();
  const gif = useSelector((state) => state.background);
  const [gifBackground, setGifBackground] = useState(
    gif === "light.gif" ? lightGif : darkGif
  );
  useEffect(() => {
    if (!authen.isLogin()) {
      return navigate("/login");
    }
  });
  useEffect(() => {
    console.log(color);
  }, [color]);
  useEffect(() => {
    setGifBackground(gif === "light.gif" ? lightGif : darkGif);
    setColor(gif === "light.gif" ? "day" : "night");
  }, [gif]);
  function goToCPUMode() {
    id = uuidv4();
    return navigate(`/game?mode=CPU&id=${id}`);
  }
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
        {idParam && modeParam === "CPU" ? (
          <>
            <div className="w-1/5 h-full"></div>
            <div className="w-3/5 h-full flex">
              <div className="m-auto">
                <ChessBoard />
              </div>
            </div>
            <div className="w-1/5 h-full flex">
              <InfoBoard />
            </div>
          </>
        ) : null}
        {!idParam ? (
          <motion.div
            className="w-full h-full flex"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              transition: "all 0.5s ease-in-out",
            }}
          >
            <div className="m-auto bg-white w-1/3 px-3 p-6 flex-col">
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
                    goToCPUMode();
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
                >
                  <P2Mode className="m-auto " style={{}} size={100} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>{" "}
    </div>
  );
};

export default GamePage;
