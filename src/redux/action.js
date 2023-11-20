const changeTheme = (payload) => {
  return {
    type: "CHANGE_THEME",
    payload,
  };
};

const setPlayer2Name = (payload) => {
  return {
    type: "SET_PLAYER_2_NAME",
    payload,
  };
};

const setMode = (payload) => {
  return {
    type: "SET_MODE",
    payload,
  };
};

const isBreak = (payload) => {
  return {
    type: "IS_BREAK",
    payload,
  };
};

const setTime = (payload) => {
  return {
    type: "SET_TIME",
    payload,
  };
};

const setScore = (payload) => {
  return {
    type: "SET_SCORE",
    payload,
  };
};

const setId = (payload) => {
  return {
    type: "SET_ID",
    payload,
  };
};

const setStartTime = (payload) => {
  return {
    type: "SET_START_TIME",
    payload,
  };
};

const setUsername = (payload) => {
  return {
    type: "SET_USER",
    payload,
  };
};

const setDataBoard = (payload) => {
  return {
    type: "SET_DATA_BOARD",
    payload,
  };
};
const getRandomAvt = () => {
  return {
    type: "GET_RANDOM_AVT",
  };
};

export {
  changeTheme,
  setMode,
  setPlayer2Name,
  isBreak,
  setTime,
  setScore,
  setId,
  setStartTime,
  setUsername,
  setDataBoard,
  getRandomAvt,
};
