import React, { useEffect, useState } from "react";
import * as authen from "../authentication/index";
import SpinnerLoading from "../components/loading";
import Header from "../components/header/Header";
import lightGif from "../assets/images/light.gif";
import darkGif from "../assets/images/dark.gif";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as icon from "../icon/index";
import { motion } from "framer-motion";
import * as API from "../axios/API/index";
let temp = "  ";

const ConfirmLogout = (props) => {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    setPending(true);
    API.logout()
      .then(() => {
        document.cookie = "token" + `=; expires=Thu, ${Date.now()} ; path=/;`;
        setTimeout(() => {
          setPending(false);
          navigate("/Login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        alert("Logout failure!");
      });
  };
  return (
    <motion.div
      className="w-screen fixed top-[60px] left-0 bottom-0 right-0 flex z-40"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <motion.div
        initial={{ scale: 0.4, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        className="w-[350px] bg-white rounded-md m-auto"
      >
        <div className="w-full h-[50px] border-b-2 px-2 py-1 flex justify-between items-center">
          <div>Confirm</div>
          <div
            onClick={() => {
              props.callback();
            }}
            className="py-1 px-2 hover:bg-light hover:text-white cursor-pointer text-[16px]"
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          >
            &times;
          </div>
        </div>
        <div className="p-3 flex flex-col gap-5">
          <div className="text-left">Do you want to log out?</div>
          <div className="flex justify-end gap-2">
            <button
              className="px-2 py-1 bg-red text-white hover:opacity-[0.6]"
              onClick={() => {
                props.callback();
              }}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 bg-blue text-white hover:opacity-[0.6]"
              onClick={logout}
            >
              Accept
            </button>
          </div>
        </div>
      </motion.div>
      {pending && <SpinnerLoading />}
    </motion.div>
  );
};
const SettingPage = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const theme = useSelector((state) => state.theme);
  const avt = useSelector((state) => state.avatar);
  const gif = useSelector((state) => state.background);
  const [isLogout, setIsLogout] = useState(false);
  const [mode, setMode] = useState("profile");
  const [user, setUser] = useState({});
  const [pending, setPending] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [gifBackground, setGifBackground] = useState(
    gif === "light.gif" ? lightGif : darkGif
  );
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [color, setColor] = useState(
    theme === "day" ? "xLightColor" : "oDarkColor"
  );
  useEffect(() => {
    API.getUser()
      .then((res) => {
        const user = res.data.user[0];
        setUser(user);
        setName(user.NAME);
        setUsername(user.USERNAME);
        setEmail(user.EMAIL);
      })
      .catch((err) => console.log(err));
    localStorage.removeItem("data");
    if (!authen.isLogin()) {
      return navigate("/login");
    }
  }, []);
  useEffect(() => {
    const nameInput = document.querySelector(".full-name-input");
    if (nameInput) {
      nameInput.focus();
    }
    console.log(nameInput);
  }, [editName]);
  useEffect(() => {
    setColor(theme === "day" ? "xLightColor" : "oDarkColor");
  }, [theme]);
  useEffect(() => {
    setGifBackground(gif === "light.gif" ? lightGif : darkGif);
  }, [gif]);
  return !authen.isLogin ? (
    <SpinnerLoading />
  ) : (
    <>
      <Header />
      <div
        className="w-full h-[calc(100vh-60px)] py-10 px-12 "
        style={{
          backgroundImage: `url(${gifBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="bg-white w-full h-full p-10 flex gap-5"
        >
          <div className="w-1/2 h-full border border-red">
            <div className="h-[150px] flex gap-10">
              <div className="">
                <div
                  className="h-full w-[150px] bg-white rounded-[50%] avatar"
                  style={{
                    backgroundImage: `url(${avt})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  {" "}
                </div>
                <button
                  className="cursor-pointer text-blue text-[14px]"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Get new random avatar
                </button>
              </div>
              <div className="flex items-end">
                <div className="flex gap-5">
                  {editName ? (
                    <input
                      className={`${color} text-[30px] font-bold full-name-input border-2 border-black w-[80%]`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  ) : (
                    <div className={`${color} text-[30px] font-bold`}>
                      {name}
                    </div>
                  )}

                  {!editName ? (
                    <button
                      className="hover:opacity-60"
                      onClick={() => {
                        temp = name;
                        console.log(temp);
                        setEditName((prev) => {
                          prev = true;
                          return prev;
                        });
                      }}
                    >
                      <icon.editButton size={20} />
                    </button>
                  ) : (
                    <div className="flex gap-3 items-center">
                      <button
                        className=" cursor-pointer px-2 py-1 bg-red text-white rounded-xl"
                        onClick={() => {
                          setName(temp);
                          setEditName(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className=" cursor-pointer px-4 py-1 bg-blue text-white rounded-xl"
                        onClick={() => {
                          setEditName(false);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="navigation mt-16 flex flex-col gap-5 px-6">
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
                className="rounded-lg text-[16px] p-3 cursor-pointer w-[70%] relative"
                style={{
                  boxShadow: "0px 3px 3px 3px #cccc",
                }}
                onClick={() => {
                  setMode("profile");
                }}
              >
                <div className="flex items-center gap-5">
                  <icon.userIcon />
                  <p>Profile</p>
                </div>
                <div
                  className={`p-3 flex items-center gap-5 absolute left-0 right-0 top-0 bottom-0 ${
                    theme === "day" ? "bg-light" : "bg-dark"
                  } rounded-lg opacity-0 hover:opacity-100`}
                >
                  <icon.userIcon color={"white"} />
                  <p className="text-white font-bold">Profile</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
                className="rounded-lg text-[16px] p-3 cursor-pointer w-[70%] relative"
                style={{
                  boxShadow: "0px 3px 3px 3px #cccc",
                }}
                onClick={() => {
                  setMode("setting");
                  setEditInfo(false);
                }}
              >
                <div className="flex items-center gap-5">
                  <icon.settingIcon />
                  <p>Setting</p>
                </div>
                <div
                  className={`p-3 flex items-center gap-5 absolute left-0 right-0 top-0 bottom-0 ${
                    theme === "day" ? "bg-light" : "bg-dark"
                  } rounded-lg opacity-0 hover:opacity-100`}
                >
                  <icon.settingIcon color={"white"} />
                  <p className="text-white font-bold">Setting</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
                className="rounded-lg text-[16px] p-3 cursor-pointer w-[70%] relative"
                style={{
                  boxShadow: "0px 3px 3px 3px #cccc",
                }}
                onClick={() => {
                  setIsLogout(true);
                }}
              >
                <div className="flex items-center gap-5">
                  <icon.logoutButton />
                  <p>Logout</p>
                </div>
                <div
                  className={`p-3 flex items-center gap-5 absolute left-0 right-0 top-0 bottom-0 ${
                    theme === "day" ? "bg-light" : "bg-dark"
                  } rounded-lg opacity-0 hover:opacity-100`}
                >
                  <icon.logoutButton color={"white"} />
                  <p className="text-white font-bold">Logout</p>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="w-1/2 h-full border border-red overflow-hidden">
            {mode === "profile" && (
              <motion.div
                className="w-full h-full text-left gap-5 user-info justify-center"
                initial={{ x: 500 }}
                animate={{ x: 0 }}
              >
                <div className="flex gap-5 items-center">
                  <h1 className={`text-[30px] ${color} font-bold`}>INFOR</h1>
                  <div
                    onClick={() => {
                      setEditInfo(true);
                    }}
                  >
                    <icon.editButton size={20} />
                  </div>
                </div>
                <div className="w-full p-20 flex flex-col gap-5">
                  <div className="flex gap-5">
                    <label className={`${color} font-bold`}>USERNAME: </label>
                    {editInfo ? (
                      <input
                        className="p-1 border border-black"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    ) : (
                      <p>{username}</p>
                    )}
                  </div>
                  <div>
                    <div className="flex gap-5">
                      <label className={`${color} font-bold`}>EMAIL: </label>
                      {editInfo ? (
                        <input
                          className="p-1 border border-black"
                          value={email}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                      ) : (
                        <p>{email}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-5">
                      <label className={`${color} font-bold`}>SCORE: </label>
                      <p>{user.SCORE}</p>
                    </div>
                  </div>
                  {editInfo && (
                    <div className="flex gap-3 items-center">
                      <button
                        className=" cursor-pointer px-2 py-1 bg-red text-white rounded-xl"
                        onClick={() => {
                          setEditInfo(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className=" cursor-pointer px-4 py-1 bg-blue text-white rounded-xl"
                        onClick={() => {
                          setEditInfo(false);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            {mode === "setting" && (
              <motion.div
                className="w-full h-full text-left gap-5 user-info justify-center"
                initial={{ x: 500 }}
                animate={{ x: 0 }}
              >
                <div className="flex gap-5 items-center">
                  <h1 className={`text-[30px] ${color} font-bold`}>SETTING</h1>
                </div>
                <div className="w-full p-20 flex flex-col gap-5">
                  <div>
                    <div className="flex gap-5">
                      <label className={`${color} font-bold`}>EMAIL: </label>
                      {editInfo ? (
                        <input
                          className="p-1 border border-black"
                          value={user.EMAIL}
                        />
                      ) : (
                        <p>{user.EMAIL}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-5">
                      <label className={`${color} font-bold`}>SCORE: </label>
                      <p>{user.SCORE}</p>
                    </div>
                  </div>
                  {editInfo && (
                    <div className="flex gap-3 items-center">
                      <button
                        className=" cursor-pointer px-2 py-1 bg-red text-white rounded-xl"
                        onClick={() => {
                          setEditInfo(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className=" cursor-pointer px-4 py-1 bg-blue text-white rounded-xl"
                        onClick={() => {
                          setEditInfo(false);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
          {isLogout && (
            <ConfirmLogout
              callback={() => {
                setIsLogout(false);
              }}
            />
          )}
        </motion.div>
      </div>
    </>
  );
};

export default SettingPage;
