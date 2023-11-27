import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/action";
import SpinnerLoading from "../loading";
import * as API from "../../axios/API/index";
import { getTokenFromCookie } from "../../handleToken";
import { useEffect } from "react";
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
      className="w-screen fixed h-screen top-0 left-0 bottom-0 right-0 flex z-50"
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

const Header = () => {
  const navigate = useNavigate();
  const url = window.location.pathname;
  const [isLogout, setIsLogout] = useState(false);
  const avt = useSelector((state) => state.avatar);
  const dispatch = useDispatch();
  const [isShowMenu, setIsShowMenu] = useState(false);

  const theme = useSelector((state) => state.theme);

  return (
    <div
      className={theme === "day" ? "bg-light" : "bg-night"}
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        justifyContent: "space-between",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="nav-container flex gap-6">
        <NavLink
          className={`${url === "/" ? "active" : null}`}
          to="/dashboard"
          style={{
            color: "white",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        >
          HOME
        </NavLink>
        <NavLink
          to="/game"
          style={{
            color: "white",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        >
          GAME
        </NavLink>
        <NavLink
          to="/user"
          style={{
            color: "white",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        >
          USER
        </NavLink>
      </div>
      <div className="relative h-[40px] w-[40px]">
        <div
          className="h-full w-full bg-white rounded-full"
          style={{
            backgroundImage: `url(${avt})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => {
            setIsShowMenu(!isShowMenu);
          }}
        ></div>
        {isShowMenu && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="custom-bar w-[200px] pb-3 absolute z-40 bg-white right-0 top-[calc(100%+15px)] rounded-md"
            style={{
              boxShadow: "0px 0px 12px 3px #cccc",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "0",
                height: "0",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid white",
                transform: "translateY(-100%)",
                right: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            ></div>
            <div className="info-user w-full px-3 py-4">
              <div className="w-full h-full flex justify-center flex-col gap-3">
                <div className="w-full flex">
                  <img
                    src={avt}
                    alt=""
                    className=" rounded-full w-[50px] h-[50px] m-auto"
                  />
                </div>
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    color: `${theme === "day" ? "#F73413" : "#476D6A"}`,
                    border: `4px solid ${
                      theme === "day" ? "#F73413" : "#476D6A"
                    }`,
                  }}
                  className="px-2 py-1 rounded-[20px] text-sm cursor-pointer"
                  style={{
                    boxShadow: "0px 4px 4px #cccc",
                  }}
                  onClick={() => {
                    return navigate("/user");
                  }}
                >
                  Manage your account
                </motion.div>
              </div>
            </div>
            <div className="theme-custom flex flex-col">
              <div className="text-sm">Theme</div>
              <div className="flex px-5 justify-center gap-4 mt-3">
                <div
                  className={`w-[30px] h-[30px] rounded-full bg-night theme-point cursor-pointer ${
                    theme === "night" && "active-element"
                  }`}
                  onClick={(e) => {
                    setIsShowMenu(!isShowMenu);
                    document
                      .querySelector(".active-element")
                      ?.classList.remove("active-element");
                    e.target.classList.add("active-element");
                    dispatch(
                      actions.changeTheme([
                        "night",
                        "xDark",
                        "oDark",
                        "dark.gif",
                      ])
                    );
                  }}
                ></div>
                <div
                  className={`w-[30px] h-[30px] rounded-full bg-day theme-point cursor-pointer ${
                    theme === "day" && "active-element"
                  }`}
                  onClick={(e) => {
                    setIsShowMenu(!isShowMenu);
                    document
                      .querySelector(".active-element")
                      ?.classList.remove("active-element");
                    e.target.classList.add("active-element");
                    dispatch(
                      actions.changeTheme([
                        "day",
                        "xLight",
                        "oLight",
                        "light.gif",
                      ])
                    );
                  }}
                ></div>
              </div>
            </div>
            <div className="mt-5">
              <div
                className="m-auto px-2 py-1 rounded-xl w-[40%] text-[14px] cursor-pointer"
                style={{
                  boxShadow: "0px 3px 3px 3px #cccc",
                }}
                onClick={() => {
                  setIsShowMenu(!isShowMenu);
                  setIsLogout(true);
                }}
              >
                Log out
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
    </div>
  );
};

export default Header;
