import React, { useEffect, useState } from "react";
import lightGif from "../assets/images/light.gif";
import darkGif from "../assets/images/dark.gif";
import { motion } from "framer-motion";
import * as icons from "../icon";
import * as message from "../components/messages/index";
const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const [gif, setGif] = useState(lightGif);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const loginImgClass = "w-1/2 h-full bg-transparent absolute top-0 left-0";
  const registerImgClass =
    "w-1/2 h-full bg-transparent absolute top-0 left-[400px]";
  const backGroundLightClass = "w-screen h-screen bg-day flex";
  const backGroundDarkClass = "w-screen h-screen bg-night flex";
  const [inputUserName, setInputUserName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const moveLogin = () => {
    const loginForm = document.querySelector(".login-form");
    loginForm.style.transform = "translateX(-200px)";
    loginForm.style.opacity = "0";
    setTimeout(() => {
      loginForm.style.transform = "translateX(0)";
      loginForm.style.opacity = "1";
    }, 300);
  };
  const moveRegister = () => {
    const registerForm = document.querySelector(".register-form");
    registerForm.style.transform = "translateX(200px)";
    registerForm.style.opacity = "0";
    setTimeout(() => {
      registerForm.style.transform = "translateX(0)";
      registerForm.style.opacity = "1";
    }, 300);
  };
  const clearData = () => {
    setInputUserName("");
    setInputEmail("");
    setInputPassword("");
    setInputConfirmPassword("");
    setShowConfirmPassword(false);
    setShowPassword(false);
  };
  const clearMessage = (e) => {
    const container = e.target.parentElement;
    const message = container.querySelector(".error-message");
    console.log(message);
    message?.remove();
  };
  const clearMessagePassword = (e) => {
    const container = e.target.parentElement.parentElement;
    const message = container.querySelector(".error-message");
    console.log(message);
    message?.remove();
  };

  const clearAllMessage = () => {
    const messageContainers = document.querySelectorAll(".message-container");
    messageContainers.forEach((container) => {
      container.innerHTML = "";
    });
  };
  const handleCheckRules = (...element) => {
    let isConfirm = true;
    const [username, email, password, passwordConfirm] = element;
    const loginUserContainer = document
      .querySelector("input[name=login-username]")
      .parentElement.querySelector(".message-container");
    const loginPasswordContainer = document
      .querySelector("input[name=login-password]")
      .parentElement.parentElement.querySelector(".message-container");
    const registerUserContainer = document
      .querySelector("input[name=register-username]")
      .parentElement.querySelector(".message-container");
    const registerEmailContainer = document
      .querySelector("input[name=register-email]")
      .parentElement.querySelector(".message-container");
    const registerPasswordContainer = document
      .querySelector("input[name=register-password]")
      .parentElement.parentElement.querySelector(".message-container");
    const registerConfirmPasswordContainer = document
      .querySelector("input[name=register-confirmPassword]")
      .parentElement.parentElement.querySelector(".message-container");
    if (mode === "login") {
      if (!checkRule.required(username)) {
        loginUserContainer.innerHTML = message.RequireMess();
        isConfirm = false;
      }
      if (!checkRule.required(password)) {
        loginPasswordContainer.innerHTML = message.RequireMess();
        isConfirm = false;
      }
    } else {
      if (!checkRule.required(username)) {
        registerUserContainer.innerHTML = message.RequireMess();
        isConfirm = false;
      }

      if (!checkRule.required(email)) {
        registerEmailContainer.innerHTML = message.RequireMess();
        isConfirm = false;
      }
      if (!checkRule.validateEmail(email)) {
        registerEmailContainer.innerHTML = message.ValidateEmailMess();
        isConfirm = false;
      }
      if (!checkRule.required(password)) {
        console.log(password);

        registerPasswordContainer.innerHTML = message.RequireMess();
        isConfirm = false;
      }
      if (!checkRule.minLength(password)) {
        console.log(password);
        registerPasswordContainer.innerHTML = message.MinLengthMess(6);
        isConfirm = false;
      }
      if (!checkRule.required(passwordConfirm)) {
        registerConfirmPasswordContainer.innerHTML = message.RequireMess();
        isConfirm = false;
      }
      console.log(password === passwordConfirm);
      if (!checkRule.isConfirm(password, passwordConfirm)) {
        registerConfirmPasswordContainer.innerHTML = message.IsConfirmMess();
        isConfirm = false;
      }
    }
    return isConfirm;
  };
  const handleLogin = () => {
    console.log("login");
    const formData = {
      username: inputUserName,
      password: inputPassword,
    };
    if (!handleCheckRules(formData.username, null, formData.password, null))
      return false;
    console.log(formData);
  };
  const handleRegister = () => {
    console.log("register");
    const formData = {
      username: inputUserName,
      email: inputEmail,
      password: inputPassword,
      passwordConfirm: inputConfirmPassword,
    };
    if (
      !handleCheckRules(
        formData.username,
        formData.email,
        formData.password,
        formData.passwordConfirm
      )
    )
      return false;
    console.log(formData);
  };
  const checkRule = {
    required: (value) => {
      console.log(value);
      if (value === "") {
        return false;
      }
      return true;
    },
    minLength: (value) => {
      if (value.length < 6) {
        return false;
      }
      return true;
    },
    validateEmail: (mail) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }
      return false;
    },
    isConfirm: (password, confirmPassword) => {
      if (password !== confirmPassword) {
        return false;
      }
      return true;
    },
  };
  useEffect(() => {
    if (mode === "login") {
      setGif(lightGif);
    } else {
      setGif(darkGif);
    }
  }, [mode]);
  return (
    <div
      className={`${
        mode === "login" ? backGroundLightClass : backGroundDarkClass
      }`}
      style={{
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div
        className="w-[800px] h-[500px] bg-[white] relative m-auto flex"
        style={{
          overflow: "hidden",
          boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.1)",
        }}
      >
        <motion.div
          className={`${mode === "login" ? loginImgClass : registerImgClass}`}
          style={{
            zIndex: "100",
            transition: "all 0.5s ease-in-out",
            backgroundImage: `url(${gif})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>
        <div
          className="h-full w-1/2 p-5 flex register-form"
          style={{
            transition: "all 0.5s ease-in-out",
          }}
        >
          <div className="m-auto flex flex-col gap-4 w-2/3">
            <h1
              className="mb-1 text-[40px] text-dark font-bold"
              style={{
                filter: "drop-shadow(0px 0px 20px rgba(0,0,0,0.2))",
              }}
            >
              Join Us!
            </h1>
            <div className="w-full relative">
              <input
                name="register-username"
                className="text-sm border-b-2 border-xDark rounded-sm p-2 outline-none w-full"
                placeholder="User name"
                onChange={(e) => {
                  setInputUserName(e.target.value);
                  clearMessage(e);
                }}
                value={inputUserName}
              />
              <div className="message-container"></div>
            </div>
            <div className="w-full relative">
              <input
                className="text-sm border-b-2 border-xDark rounded-sm p-2 outline-none w-full"
                name="register-email"
                placeholder="Email"
                type="email"
                onChange={(e) => {
                  setInputEmail(e.target.value);
                  clearMessage(e);
                }}
                value={inputEmail}
              />
              <div className="message-container"></div>
            </div>
            <div className="w-full relative">
              <div className="w-full relative">
                <input
                  className="text-sm border-b-2 border-dark rounded-sm p-2 outline-none w-full"
                  placeholder="Password"
                  name="register-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    clearMessagePassword(e);
                  }}
                  value={inputPassword}
                />
                <span
                  className="p-2 absolute right-0 bottom-0"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <icons.AiFillEye />
                  ) : (
                    <icons.AiFillEyeInvisible />
                  )}
                </span>
              </div>
              <div className="message-container"></div>
            </div>
            <div className="w-full relative">
              <div className="w-full relative">
                <input
                  name="register-confirmPassword"
                  className="text-sm border-b-2 border-dark rounded-sm p-2 outline-none w-full"
                  placeholder="Password"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(e) => {
                    setInputConfirmPassword(e.target.value);
                    clearMessagePassword(e);
                  }}
                  value={inputConfirmPassword}
                />
                <span
                  className="p-2 absolute right-0 bottom-0"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? (
                    <icons.AiFillEye />
                  ) : (
                    <icons.AiFillEyeInvisible />
                  )}
                </span>
              </div>
              <div className="message-container"></div>
            </div>
            <motion.button
              whileHover={{
                transform: "translateY(5px)",
                boxShadow: "none",
              }}
              className="w-full p-3 bg-dark text-white rounded-lg font-bold mt-3"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 0px 2px",
              }}
              onClick={handleRegister}
            >
              CREATE ACCOUNT
            </motion.button>
            <div className="flex text-xs mt-3">
              <h4>You already have an account? </h4>
              <button
                onClick={() => {
                  clearAllMessage();
                  setMode("login");
                  moveLogin();
                  setTimeout(() => {
                    clearData();
                  }, 500);
                }}
                className="ml-1 text-dark font-bold text-decoration-underline "
              >
                Login here!
              </button>
            </div>
          </div>
        </div>
        <div
          className=" h-full w-1/2 p-5 login-form"
          style={{
            transition: "all 0.5s ease-in-out",
          }}
        >
          <div className="m-auto flex flex-col gap-6 w-2/3">
            <h1
              className="mb-1 text-[40px] text-orange font-bold"
              style={{
                filter: "drop-shadow(0px 0px 20px rgba(0,0,0,0.2))",
              }}
            >
              Welcome Back!
            </h1>

            <div className="w-full relative">
              <input
                className="text-sm border-b-2 border-orange rounded-sm p-2 outline-none w-full"
                placeholder="User name"
                name="login-username"
                onChange={(e) => {
                  setInputUserName(e.target.value);
                  clearMessage(e);
                }}
                value={inputUserName}
              />
              <div className="message-container"></div>
            </div>

            <div className="w-full relative">
              <div className="relative w-full">
                <input
                  className="text-sm border-b-2 border-orange rounded-sm p-2 outline-none w-full"
                  placeholder="Password"
                  name="login-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    clearMessagePassword(e);
                  }}
                  value={inputPassword}
                />

                <span
                  className="p-2 absolute right-0 bottom-0"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <icons.AiFillEye />
                  ) : (
                    <icons.AiFillEyeInvisible />
                  )}
                </span>
              </div>
              <div className="message-container"></div>
            </div>
            <motion.button
              whileHover={{ boxShadow: "none", transform: "translateY(5px)" }}
              className="w-full p-3 bg-orange text-white rounded-lg font-bold mt-3"
              style={{
                boxShadow: "#FBD5A4 0px 5px 0px 2px",
              }}
              onClick={() => {
                handleLogin();
              }}
            >
              LOGIN
            </motion.button>
            <div className="flex text-xs mt-3">
              <h4>Don't have an account yet?</h4>
              <button
                onClick={() => {
                  clearAllMessage();
                  setMode("register");
                  moveRegister();
                  setTimeout(() => {
                    clearData();
                  }, 500);
                }}
                className="ml-1 text-orange font-bold text-decoration-underline"
              >
                Register here!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
