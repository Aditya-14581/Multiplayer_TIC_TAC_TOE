import React from "react";

function Square({ val, chooseSquare }) {
  return (
    <div
      className="bg-white text-black font-semibold w-24 h-24 flex items-center justify-center border border-gray-300 cursor-pointer text-4xl"
      onClick={chooseSquare}
    >
      {val}
    </div>
  );
}

export default Square;
