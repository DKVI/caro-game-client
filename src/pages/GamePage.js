import React, { useEffect, useState } from "react";
import * as authen from "../authentication/index";
import SpinnerLoading from "../components/loading";
import Header from "../components/header/Header";
import lightGif from "../assets/images/light.gif";
import darkGif from "../assets/images/dark.gif";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ChessBoard from "../components/chessBoard";
const GamePage = () => {
  let navigate = useNavigate();
  const gif = useSelector((state) => state.background);
  const [gifBackground, setGifBackground] = useState(
    gif === "light.gif" ? lightGif : darkGif
  );
  useEffect(() => {
    if (!authen.isLogin()) {
      return navigate("/login");
    }
  }, []);
  useEffect(() => {
    setGifBackground(gif === "light.gif" ? lightGif : darkGif);
  }, [gif]);
  return !authen.isLogin ? (
    <SpinnerLoading />
  ) : (
    <div className="w-full h-full">
      <Header />

      <div className="w-full h-[calc(100vh-60px)] p-16 flex">
        <div className="w-1/5 h-full border border-dark"></div>
        <div className="w-3/5 h-full border border-dark">
          <ChessBoard />
        </div>
        <div className="w-1/5 h-full border border-dark"></div>
      </div>
    </div>
  );
};

export default GamePage;
