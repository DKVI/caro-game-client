const changeTheme = (payload) => {
  return {
    type: "CHANGE_THEME",
    payload,
  };
};

export { changeTheme };
