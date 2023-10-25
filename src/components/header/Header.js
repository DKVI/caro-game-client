import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/action";
import { UseSelector } from "react-redux";
const Header = () => {
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
          to="/setting"
          style={{
            color: "white",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        >
          SETTING
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
              boxShadow: "3px 3px 4px #ccccc",
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Header;
