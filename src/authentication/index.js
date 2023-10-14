import Cookies from "js-cookie";
const isLogin = () => {
  // Lấy giá trị cookie
  const myCookie = Cookies.get("token");
  if (myCookie) {
    return true;
  }
  return false;
};

export { isLogin };
