import React, { useEffect, useState } from "react";
import * as authen from "../authentication/index";
import SpinnerLoading from "../components/loading";
import Header from "../components/header/Header";
import lightGif from "../assets/images/light.gif";
import darkGif from "../assets/images/dark.gif";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ChessBoard from "../components/chessBoard";
const DashboardPage = () => {
  let navigate = useNavigate();
  const gif = useSelector((state) => state.background);
  const [gifBackground, setGifBackground] = useState(
    gif === "light.gif" ? lightGif : darkGif
  );
  useEffect(() => {
    window.onbeforeunload = function () {
      return "Do you really want to close?";
    };
    window.onunload = function () {
      return "Do you really want to close?";
    };
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
    <>
      <Header />
      <div
        className="w-full h-[calc(100vh-60px)] flex justify-center items-center"
        style={{
          backgroundImage: `url(${gifBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </>
  );
};

export default DashboardPage;
