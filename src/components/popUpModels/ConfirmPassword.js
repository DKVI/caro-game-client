import { motion } from "framer-motion";
import * as API from "../../axios/API/index";
import { useState } from "react";
import SpinnerLoading from "../loading";
import { useNavigate } from "react-router-dom";

const ConfirmPassword = (props) => {
  const action = props.action;
  const callback = props.callback;
  const user = props.user;
  const body = props.body;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
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
  const handleAction = (action) => {
    setPending(true);
    if (password === confirmPassword) {
      switch (action) {
        case "CHANGE_INFO":
          API.login({ username: user.USERNAME, password: password })
            .then((res) => {
              const resUser = res.data.User;
              if (resUser) {
                console.log(body);
                API.updateInfo(body)
                  .then((res) => {
                    alert("Update successfully, reload to apply change!");
                    setPending(false);
                    window.location.reload();
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => {
              console.log(err);
            });
          return;
        case "CHANGE_PASSWORD":
          API.changePassword({ password: props.body.password })
            .then((res) => {
              alert("Update password successfully, please login again!");
              setPending(false);
              logout();
            })
            .catch((err) => {
              console.log(err);
            });
        default:
          return;
      }
    } else {
      alert("Pasword wrong or doesn't match!");
    }
  };
  return (
    <motion.div
      initial={{ right: "100%" }}
      animate={{ right: 0 }}
      className="w-full absolute left-0 right-0 top-0 bottom-0 z-30 bg-white px-10 py-5"
    >
      <h1 className="font-bold text-[20px]">Enter password to continue!</h1>
      <div className="flex flex-col gap-5 mt-5 justify-between">
        <div className="flex justify-between gap-2 items-center">
          <label>Password: </label>{" "}
          <input
            className="border border-black flex-1 p-1"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>{" "}
        <div className="flex justify-between gap-2 items-center">
          <label>Confirm password: </label>{" "}
          <input
            className="border border-black flex-1 p-1"
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
          />
        </div>{" "}
        <div className="flex gap-3 justify-end">
          <button
            className="px-2 py-1 bg-red rounded-md text-white"
            onClick={callback}
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 bg-blue rounded-md text-white"
            onClick={() => {
              handleAction(action);
            }}
          >
            Verify
          </button>
        </div>
      </div>
      {pending && <SpinnerLoading />}
    </motion.div>
  );
};

export default ConfirmPassword;
