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

export { changeTheme, setMode, setPlayer2Name };
