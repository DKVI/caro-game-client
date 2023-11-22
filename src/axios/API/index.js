import { getTokenFromCookie } from "../../handleToken";
import axios from "../index";
import path from "./path";
const register = async ({ username, password, email }) => {
  const formData = {
    name: username,
    username,
    password,
    email,
    admin: false,
  };
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/register", { ...formData })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const login = async (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/login", { ...formData })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getHistoryGame = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/game", {
        headers: {
          Authorization: "Bearer " + getTokenFromCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/user")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const addGameData = async (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "/game",
        { ...formData },
        {
          headers: {
            Authorization: "Bearer " + getTokenFromCookie(),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const updateAllScore = async () => {
  return new Promise((resolve, reject) => {
    axios
      .put("/user/updateAll")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getUser = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/user/auth/getUser", {
        headers: {
          Authorization: "Bearer " + getTokenFromCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
const findGame = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/game/${id}`, {
        headers: {
          Authorization: "Bearer " + getTokenFromCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const updateGame = async (ID, body) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `/game/${ID}`,
        { ...body },
        {
          headers: {
            Authorization: "Bearer " + getTokenFromCookie(),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const logout = async () => {
  console.log(getTokenFromCookie);
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/logout", {
        headers: {
          Authorization: "Bearer " + getTokenFromCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getAvt = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://random.imagecdn.app/200/200")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const updateInfo = async (body) => {
  return new Promise((resolve, reject) => {
    axios
      .patch("/auth/updateInfo", body, {
        headers: {
          Authorization: "Bearer " + getTokenFromCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const changePassword = async (body) => {
  return new Promise((resolve, reject) => {
    axios
      .patch("/auth/changePassword", body, {
        headers: {
          Authorization: "Bearer " + getTokenFromCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export {
  register,
  login,
  getHistoryGame,
  getAllUsers,
  addGameData,
  updateAllScore,
  getUser,
  findGame,
  updateGame,
  logout,
  getAvt,
  updateInfo,
  changePassword,
};
