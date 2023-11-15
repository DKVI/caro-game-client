function addTokenToCookie(token) {
  document.cookie = "token=" + token + "; max-age=3600; path=/";
}

function getTokenFromCookie() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === "token") {
      return value.trim();
    }
  }
  return null;
}

export { addTokenToCookie, getTokenFromCookie };
