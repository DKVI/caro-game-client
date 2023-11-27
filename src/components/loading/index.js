import React from "react";
import ReactLoading from "react-loading";

const SpinnerLoading = (props) => {
  const isFull = props.full;
  return (
    <div
      className="flex"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        justifyContent: "center",
      }}
    >
      <ReactLoading
        className="m-auto"
        type="spinningBubbles"
        color="white"
        height={150}
        width={100}
      />
    </div>
  );
};

export default SpinnerLoading;
