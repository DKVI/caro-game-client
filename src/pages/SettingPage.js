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
import { Switch } from "antd";
import * as action from "../redux/action";
import ConfirmPassword from "../components/popUpModels/ConfirmPassword";
let temp = "  ";
let tempData = {};
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
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        alert("Logout failure!");
      });
  };
  return (
    <motion.div
      className="w-screen fixed top-0 left-0 bottom-0 right-0 flex z-50"
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mode, setMode] = useState("profile");
  const [user, setUser] = useState({});
  const [pending, setPending] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gifBackground, setGifBackground] = useState(
    gif === "light.gif" ? lightGif : darkGif
  );
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [color, setColor] = useState(
    theme === "day" ? "xLightColor" : "oDarkColor"
  );
  const [switchTheme, setSwitchTheme] = useState(theme);
  const customSwitch = {
    backgroundColor: switchTheme === "day" ? "#B61C1C" : "#729C96",
    boxShadow: "0px 3px 3px 3px #cccc",
  };
  useEffect(() => {
    console.log(switchTheme);
  }, [switchTheme]);
  useEffect(() => {
    API.getUser()
      .then((res) => {
        const user = res.data.user[0];
        setUser(user);
        setUsername(user.USERNAME);
        setName(user.NAME);
        setEmail(user.EMAIL);
        tempData = { name: user.NAME, email: user.EMAIL };
      })
      .catch((err) => console.log(err));
    localStorage.removeItem("data");
    if (!authen.isLogin()) {
      return navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (switchTheme === "night") {
      dispatch(action.changeTheme(["night", "xDark", "oDark", "dark.gif"]));
    } else {
      dispatch(action.changeTheme(["day", "xLight", "oLight", "light.gif"]));
    }
  }, [switchTheme]);
  useEffect(() => {
    const nameInput = document.querySelector(".full-name-input");
    if (nameInput) {
      nameInput.focus();
    }
    console.log(nameInput);
  }, [editName]);
  useEffect(() => {
    setColor(theme === "day" ? "xLightColor" : "oDarkColor");
    setSwitchTheme(theme === "day" ? "day" : "night");
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
        className="w-full h-full py-10 px-12 "
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
          className="bg-white w-full h-full p-10 flex gap-5 rounded-2xl"
          style={{
            boxShadow: "0px 3px 3px 3px #cccc",
          }}
        >
          <div className="w-1/2 h-full">
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
                      className={`${color} text-[24px] font-bold full-name-input border-2 border-black w-[80%]`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  ) : (
                    <div className={`${color} text-[24px] font-bold`}>
                      {name}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="navigation mt-16 flex flex-col gap-5 px-6">
              {
                <motion.div
                  className="rounded-lg p-3 cursor-pointer w-[70%] relative"
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
                    style={{
                      transition: "all 0.2s ease-in-out",
                    }}
                    className={`p-3 flex items-center gap-5 absolute left-0 right-0 top-0 bottom-0 ${
                      theme === "day" ? "bg-light" : "bg-dark"
                    } rounded-lg ${
                      mode === "profile"
                        ? "scale-[1.2]"
                        : "opacity-0 hover:opacity-100 hover:scale-[1.2]"
                    }`}
                  >
                    <icon.userIcon color={"white"} />
                    <p className="text-white font-bold">Profile</p>
                  </div>
                </motion.div>
              }
              <motion.div
                className="rounded-lg p-3 cursor-pointer w-[70%] relative"
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
                  style={{
                    transition: "all 0.2s ease-in-out",
                  }}
                  className={`p-3 flex items-center gap-5 absolute left-0 right-0 top-0 bottom-0 ${
                    theme === "day" ? "bg-light" : "bg-dark"
                  } rounded-lg ${
                    mode === "setting"
                      ? "scale-[1.2]"
                      : "opacity-0 hover:opacity-100 hover:scale-[1.2]"
                  }`}
                >
                  <icon.settingIcon color={"white"} />
                  <p className="text-white font-bold">Setting</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
                className="rounded-lg text-[14px] p-3 cursor-pointer w-[70%] relative"
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
          <div className="w-1/2 h-full overflow-hidden">
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
                <div
                  className="w-[90%] p-5 mt-10 mx-5  flex flex-col gap-5 rounded-2xl relative overflow-hidden"
                  style={{
                    boxShadow: "rgba(204, 204, 204, 0.8) 0px 3px 3px 3px",
                  }}
                >
                  <div className="flex gap-5">
                    <label
                      className={`${color} font-bold`}
                      style={{
                        filter: "drop-shadow(red 1rem 1rem 10px);",
                      }}
                    >
                      USERNAME:{" "}
                    </label>
                    <p>{username}</p>
                  </div>
                  <div className="flex gap-5">
                    <label
                      className={`${color} font-bold`}
                      style={{
                        filter: "drop-shadow(red 1rem 1rem 10px);",
                      }}
                    >
                      FULLNAME:{" "}
                    </label>
                    {editInfo ? (
                      <input
                        className="p-1 border border-black flex-1 rounded-lg"
                        style={{
                          boxShadow: "0px 3px 3px 3px #cccc",
                        }}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    ) : (
                      <p>{name}</p>
                    )}
                  </div>
                  <div>
                    <div className="flex gap-5">
                      <label className={`${color} font-bold`}>EMAIL: </label>
                      {editInfo ? (
                        <input
                          className="p-1 border border-black flex-1 rounded-lg"
                          style={{
                            boxShadow: "0px 3px 3px 3px #cccc",
                          }}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
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
                  {!editInfo && (
                    <div className="flex gap-3 items-center">
                      <button
                        className=" cursor-pointer px-5 py-2 bg-blue text-white rounded-xl"
                        onClick={() => {
                          setEditInfo(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                  {editInfo && (
                    <div className="flex gap-3 items-center">
                      <button
                        className=" cursor-pointer px-2 py-1 bg-red text-white rounded-xl"
                        onClick={() => {
                          setEditInfo(false);
                          setEmail(tempData.email);
                          setName(tempData.name);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className=" cursor-pointer px-4 py-1 bg-blue text-white rounded-xl"
                        onClick={() => {
                          setEditInfo(false);
                          setShowConfirmPassword(true);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  )}
                  {showConfirmPassword && (
                    <ConfirmPassword
                      user={user}
                      body={{
                        name: name,
                        email: email,
                      }}
                      action={"CHANGE_INFO"}
                      callback={() => {
                        setEmail(tempData.email);
                        setShowConfirmPassword(false);
                      }}
                    />
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
                <div className="w-full px-10 flex flex-col gap-5">
                  <div>
                    <label className="font-bold">THEME:</label>
                    <div className="flex gap-5 ml-10 mt-5">
                      <Switch
                        checked={theme === "night" ? true : false}
                        style={customSwitch}
                        onChange={() => {
                          console.log(true);
                          console.log(switchTheme);

                          setSwitchTheme((prev) => {
                            prev = prev === "day" ? "night" : "day";
                            return prev;
                          });
                        }}
                      />{" "}
                      <p
                        className={`font-bold ${
                          switchTheme === "day" ? "text-xLight" : "text-oDark"
                        }`}
                      >
                        {switchTheme === "day" ? "LIGHT " : "DARK "}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="font-bold">CHANGE PASSWORD:</label>
                    <div className="flex flex-col ml-10 mt-5">
                      <div className="flex gap-4 justify-between items-center">
                        <label>New password:</label>{" "}
                        <input
                          className="px-2 py-1 flex-1 border-2 broder-black new-password-input"
                          type="password"
                          onChange={(e) => {
                            if (e.target.value.length > 0) {
                              setIsChangePassword(true);
                            } else {
                              setIsChangePassword(false);
                            }
                            setNewPassword(e.target.value);
                          }}
                          value={newPassword}
                        />
                        {showPassword && (
                          <button
                            className="px-2 py-1 bg-red text-white rounded-lg"
                            onClick={() => {
                              document.querySelector(
                                ".new-password-input"
                              ).type = "password";
                              setShowPassword(false);
                            }}
                          >
                            hide
                          </button>
                        )}
                        {!showPassword && (
                          <button
                            className="px-2 py-1 bg-blue text-white rounded-lg"
                            onClick={() => {
                              document.querySelector(
                                ".new-password-input"
                              ).type = "text";
                              setShowPassword(true);
                            }}
                          >
                            show
                          </button>
                        )}
                      </div>
                      <div className="w-full h-[100px] relative">
                        {isChangePassword && (
                          <ConfirmPassword
                            action={"CHANGE_PASSWORD"}
                            body={{ password: newPassword }}
                            callback={() => {
                              setIsChangePassword(false);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
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
