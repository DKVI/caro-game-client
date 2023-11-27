import React, { useEffect, useState } from "react";
import * as authen from "../authentication/index";
import SpinnerLoading from "../components/loading";
import Header from "../components/header/Header";
import lightGif from "../assets/images/light.gif";
import darkGif from "../assets/images/dark.gif";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Chart from "react-google-charts";
import { games, user } from "../demoData";
import * as icon from "../icon/index";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import * as API from "../axios/API/index";
import utils from "../utils";

const DashboardPage = () => {
  localStorage.removeItem("data");
  const theme = useSelector((state) => state.theme);
  const { formatTimeFromSeconds, normalSort } = utils;
  const result = (games) => {
    let win = 0;
    let lose = 0;
    Array.from(games).forEach((item) => {
      if (item.result === "Win") win++;
      else {
        lose++;
      }
    });
    return {
      win,
      lose,
    };
  };
  const [currentUser, setCurrentUser] = useState(null);
  const [history, setHistory] = useState(null);
  const [dataChart, setDataChart] = useState([
    ["Task", "Hours per Day"],
    ["Win", 0],
    ["Lose", 0],
  ]);
  const [optionChart, setOptionChart] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const username = useSelector((state) => state.username);
  const updateAllScore = async () => {
    console.log(dataChart);
    await API.updateAllScore()
      .then((res) => {
        console.log(res);
        getAllUser();
      })
      .catch((err) => console.log(err));
  };
  const getHistoryGame = async () => {
    await API.getHistoryGame()
      .then((res) => {
        setHistory((prev) => {
          prev = res.data.games;
          return prev;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(dataChart);
  }, [dataChart]);
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      API.getUser()
        .then((res) => {
          resolve(res.data.user[0]);
        })
        .catch((err) => reject(err));
    });
  };
  const getAllUser = async () => {
    await API.getAllUsers()
      .then(async (res) => {
        console.log(res);
        let rank = 0;
        const user = await getCurrentUser();

        setAllUsers((prev) => {
          prev = normalSort(res.data.users);
          Array.from(prev).forEach((item, index) => {
            if (item.USERNAME === user.USERNAME) rank = index + 1;
          });
          setCurrentUser({ rank, ...user });
          return prev;
        });
      })
      .catch((err) => console.log(err));
  };
  let navigate = useNavigate();
  const gif = useSelector((state) => state.background);
  const [color, setColor] = useState(
    gif === "light.gif" ? "xLightColor" : "xDarkColor"
  );
  const [gifBackground, setGifBackground] = useState(
    gif === "light.gif" ? lightGif : darkGif
  );
  useEffect(() => {
    window.removeEventListener("keypress", (e) => {
      console.log(e.key);
    });
    if (!authen.isLogin()) {
      return navigate("/login");
    }
    updateAllScore();
    getHistoryGame();
  }, []);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  useEffect(() => {
    if (history) {
      const win = Array.from(history).reduce((sum, item) => {
        if (item.SCORE > 0) sum++;
        return sum;
      }, 0);
      const lose = Array.from(history).reduce((sum, item) => {
        if (item.SCORE < 0) sum++;
        return sum;
      }, 0);
      console.log(win, lose);
      setDataChart([
        ["Task", "Hours per Day"],
        ["Win", win],
        ["Lose", lose],
      ]);
      setOptionChart({
        pieHole: 0.4,
        is3D: true,
      });
    }
  }, [history]);
  useEffect(() => {
    setGifBackground(gif === "light.gif" ? lightGif : darkGif);
    setColor(gif === "light.gif" ? "xLightColor" : "xDarkColor");
  }, [gif]);
  return !authen.isLogin ? (
    <SpinnerLoading />
  ) : (
    <>
      <Header />
      <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center overflow-hidden">
        <motion.div className="w-full h-full m-auto p-8 flex justify-between gap-4">
          <div className="w-2/3 h-full flex justify-between gap-4">
            <motion.div
              initial={{
                opacity: 0.5,
                x: -100,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className=" w-1/2 h-full rounded-2xl p-6 flex flex-col justify-between gap-4 overflow-hidden"
              style={{
                boxShadow: "2px 2px 10px 3px #cccc",
              }}
            >
              <div className="flex gap-4">
                <div className="w-[20%] flex">
                  <h1
                    className={`font-bold ${color} text-[20px] text-left m-auto`}
                    style={{
                      filter: "drop-shadow(2px 4px 1px #cccc)",
                    }}
                  >
                    RANK
                  </h1>
                </div>
                <div className="w-[80%]">
                  {currentUser ? (
                    <div
                      className={`flex gap-2 w-full h-[50px]  ${
                        currentUser.rank === 1 &&
                        "border-[4px] border-[#FFD700]"
                      } ${
                        currentUser.rank === 2 &&
                        "border-[4px] border-[#C0C0C0]"
                      } ${
                        currentUser.rank === 3 &&
                        "border-[4px] border-[#CD7F32]"
                      }`}
                      style={{
                        boxShadow: "2px 2px 10px 3px #cccc",
                      }}
                    >
                      {currentUser.rank === 1 && (
                        <div className="w-1/5 flex align-middle">
                          <icon.goldCrown />
                        </div>
                      )}
                      {currentUser.rank === 2 && (
                        <div className="w-1/5 flex align-middle">
                          <icon.silverCrown />
                        </div>
                      )}
                      {currentUser.rank === 3 && (
                        <div className="w-1/5 flex align-middle">
                          <icon.bronzeCrown />
                        </div>
                      )}
                      {currentUser.rank > 3 && (
                        <div
                          className="w-1/5 flex align-middle"
                          style={{
                            filter: "drop-shadow(2px 4px 1px #cccc)",
                          }}
                        >
                          <div
                            className="m-auto"
                            style={{
                              filter: "drop-shadow(2px 4px 1px #cccc)",
                            }}
                          >
                            {currentUser.rank}
                          </div>
                        </div>
                      )}
                      <div
                        className="w-3/5 h-full flex"
                        style={{
                          filter: "drop-shadow(2px 4px 1px #cccc)",
                        }}
                      >
                        <p className="m-auto">{currentUser.USERNAME} </p>
                      </div>
                      <div
                        className="flex-none flex"
                        style={{
                          filter: "drop-shadow(2px 4px 1px #cccc)",
                        }}
                      >
                        <p className="m-auto">{currentUser.SCORE}</p>
                      </div>
                    </div>
                  ) : (
                    <Skeleton className="flex flex-col gap-2 w-full h-[40px]" />
                  )}
                </div>
              </div>
              <div
                className="flex-none h-[calc(100%-64px)] w-full overflow-scroll no-scrollbar px-2"
                style={{
                  boxShadow: "inset 2px 2px 10px 3px #cccc",
                }}
              >
                <div className="flex flex-col">
                  {allUsers.length !== 0
                    ? Array.from(allUsers).map((item, index) => {
                        const rank = index + 1;
                        return (
                          <div
                            key={index}
                            className={`w-full rounded-md flex-none mt-2 px-3 py-3 flex  ${
                              index + 1 === 1 && "border-[4px] border-[#FFD700]"
                            } ${
                              index + 1 === 2 && "border-[4px] border-[#C0C0C0]"
                            } ${
                              index + 1 === 3 && "border-[4px] border-[#CD7F32]"
                            }`}
                            style={{
                              boxShadow: "2px 2px 10px 3px #cccc",
                            }}
                          >
                            {index + 1 === 1 && (
                              <div className="w-1/5 flex align-middle">
                                <icon.goldCrown />
                              </div>
                            )}
                            {index + 1 === 2 && (
                              <div className="w-1/5 flex align-middle">
                                <icon.silverCrown />
                              </div>
                            )}
                            {index + 1 === 3 && (
                              <div className="w-1/5 flex align-middle">
                                <icon.bronzeCrown />
                              </div>
                            )}
                            {index + 1 > 3 && (
                              <div
                                className="w-1/5 flex align-middle"
                                style={{
                                  filter: "drop-shadow(2px 4px 1px #cccc)",
                                }}
                              >
                                <div
                                  className="m-auto"
                                  style={{
                                    filter: "drop-shadow(2px 4px 1px #cccc)",
                                  }}
                                >
                                  {index + 1}
                                </div>
                              </div>
                            )}
                            <div
                              className="w-3/5 flex align-middle"
                              style={{
                                filter: "drop-shadow(2px 4px 1px #cccc)",
                              }}
                            >
                              {item.USERNAME}{" "}
                            </div>
                            <div
                              className="w-1/5 flex align-middle"
                              style={{
                                filter: "drop-shadow(2px 4px 1px #cccc)",
                              }}
                            >
                              {item.SCORE}
                            </div>
                          </div>
                        );
                      })
                    : Array(10)
                        .fill(0)
                        .map((item, index) => (
                          <Skeleton className="w-full rounded-md flex-none mt-2 px-3 py-3 flex h-[40px]" />
                        ))}
                </div>
              </div>
            </motion.div>
            <div className=" w-1/2 h-full flex flex-col gap-4 user-info-container">
              <motion.div
                initial={{
                  opacity: 0.5,
                  y: -100,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="w-full h-1/2 rounded-2xl flex bg-white flex-col relative "
                style={{
                  boxShadow: "2px 2px 10px 3px #cccc",
                }}
              >
                <h1
                  className={`absolute left-6 top-6 z-20 font-bold ${color} text-[20px]`}
                  style={{
                    filter: "drop-shadow(2px 4px 1px #cccc)",
                  }}
                >
                  RATE
                </h1>

                <div className="w-[100%] h-[80%] m-auto">
                  {/* <Chart
                    className="rounded-lg"
                    chartType="PieChart"
                    data={dataChart}
                    width="100%"
                    height="100%"
                    options={optionChart}
                  /> */}
                  {dataChart[1][1] === 0 && dataChart[2][1] === 0 ? (
                    <div className="w-full h-full flex justify-center items-center flex-col gap-5">
                      <div>Have no data</div>
                      <motion.div
                        whileHover={{
                          scale: 1.2,
                        }}
                        className={`py-1 px-2 text-white rounded-xl font-bold cursor-pointer ${
                          theme === "day" ? "bg-light" : "bg-night"
                        }`}
                        style={{
                          boxShadow: "0px 3px 3px 3px #cccc",
                        }}
                        onClick={() => {
                          return navigate("/game");
                        }}
                      >
                        Play now!
                      </motion.div>
                    </div>
                  ) : (
                    <Chart
                      className="rounded-lg"
                      chartType="PieChart"
                      data={dataChart}
                      width="100%"
                      height="100%"
                      options={optionChart}
                    />
                  )}
                </div>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0.5,
                  y: 100,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="w-full h-1/2 rounded-2xl p-6 gap-4 flex flex-col"
                style={{
                  boxShadow: "2px 2px 10px 3px #cccc",
                }}
              >
                <h1
                  className={`font-bold ${color} text-[20px] text-left`}
                  style={{
                    filter: "drop-shadow(2px 4px 1px #cccc)",
                  }}
                >
                  HISTORY
                </h1>
                <div
                  className="flex-none h-[calc(100%-40px)] w-full overflow-scroll no-scrollbar px-2"
                  style={{
                    boxShadow: "inset 2px 2px 10px 3px #cccc",
                  }}
                >
                  <div className="flex flex-col gap-2">
                    {history
                      ? Array.from(history).map((item, index) => (
                          <div
                            key={index}
                            className={`w-full rounded-md flex-none mt-2 px-3 py-3 flex relative ${
                              item.SCORE === 0 &&
                              `border-4 ${
                                theme === "night"
                                  ? "border-dark"
                                  : "border-light"
                              } cursor-pointer`
                            }`}
                            onClick={(e) => {
                              if (e.target.closest(".cursor-pointer")) {
                                localStorage.setItem(
                                  "data",
                                  JSON.stringify({
                                    ID: item.ID,
                                    OPPONENT_NAME: item.OPPONENT_NAME,
                                    DATA: item.DATA,
                                    NEXTMOVE: item.NEXTMOVE,
                                    PLAY_TIME: item.PLAY_TIME,
                                  })
                                );
                                if (item.OPPONENT_NAME !== "CPU") {
                                  return navigate(
                                    `/game?mode=2Player&2PlayerName=${item.OPPONENT_NAME}&id=${item.ID}`
                                  );
                                } else {
                                  return navigate(
                                    `/game?mode=CPU&id=${item.ID}`
                                  );
                                }
                              }
                            }}
                            style={{
                              boxShadow: "2px 2px 10px 3px #cccc",
                            }}
                          >
                            {item.SCORE === 0 && (
                              <motion.div
                                whileHover={{
                                  opacity: 1,
                                }}
                                className={`w-full opacity-0 h-full ${
                                  theme === "night" ? "bg-dark" : "bg-light"
                                } absolute left-0 right-0 top-0 bottom-0 z-40 flex overflow-hidden`}
                              >
                                <div className="m-auto text-white font-bold">
                                  CONTINUE?
                                </div>
                              </motion.div>
                            )}
                            <div
                              className="w-1/4 flex align-middle"
                              style={{
                                filter: "drop-shadow(2px 4px 1px #cccc)",
                              }}
                            >
                              <div
                                className={`m-auto font-bold ${
                                  item.SCORE !== 0
                                    ? item.SCORE < 0
                                      ? "text-red"
                                      : "text-blue"
                                    : "text-green"
                                }`}
                                style={{
                                  filter: "drop-shadow(2px 4px 1px #cccc)",
                                }}
                              >
                                {item.SCORE !== 0
                                  ? item.SCORE < 0
                                    ? "LOSE"
                                    : "WIN"
                                  : "PAUSE"}
                              </div>
                            </div>
                            <div
                              className="w-1/4 flex align-middle"
                              style={{
                                filter: "drop-shadow(2px 4px 1px #cccc)",
                              }}
                            >
                              <div className="">
                                {item.OPPONENT_NAME === "CPU"
                                  ? "CPU"
                                  : "2Player"}{" "}
                              </div>
                            </div>
                            <div
                              className="flex-none flex align-middle  w-1/4"
                              style={{
                                filter: "drop-shadow(2px 4px 1px #cccc)",
                              }}
                            >
                              {formatTimeFromSeconds(item.PLAY_TIME)}
                            </div>
                            <div
                              className={`w-1/4 flex align-middle  ${
                                item.SCORE !== 0
                                  ? item.SCORE > 0
                                    ? "text-green"
                                    : "text-red"
                                  : "text-black"
                              }`}
                              style={{
                                filter: "drop-shadow(2px 4px 1px #cccc)",
                              }}
                            >
                              {item.SCORE !== 0
                                ? item.SCORE < 0
                                  ? item.SCORE
                                  : `+${item.SCORE}`
                                : "no score"}
                            </div>
                          </div>
                        ))
                      : Array(10)
                          .fill(0)
                          .map((item, index) => (
                            <Skeleton className="w-full rounded-md flex-none mt-2 px-3 py-3 flex" />
                          ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{
              opacity: 0.5,
              x: 100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="w-1/3 h-full py-5 relative play-container"
            style={{
              backgroundImage: `url(${gifBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "20px",
              boxShadow: "2px 2px 10px 3px #cccc",
            }}
          >
            <motion.button
              className="w-1/3 bg-white rounded-2xl py-1 absolute bottom-0 left-1/2 translate-x-[-50%] mb-16"
              style={{
                boxShadow: "1px 1px 5px 2px gray",
              }}
              whileHover={{
                width: "50%",
              }}
              transition={{
                duration: 0.5,
              }}
              onClick={() => {
                return navigate("/game");
              }}
            >
              PLAY NOW!
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default DashboardPage;
