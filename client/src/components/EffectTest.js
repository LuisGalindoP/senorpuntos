import React, { useEffect, useState } from "react";

const EffectTest = () => {
  const [count, setCount] = useState(0);

  const manageCount = () => {
    setCount(count + 1);
  };

  console.log("This is a console on reload");
  return (
    <div>
      <h3>TESTING EFFECT</h3>
      <h3>{count} </h3>
      <button
        onClick={() => {
          manageCount();
        }}
      >
        Add 1
      </button>
    </div>
  );
};

export default EffectTest;
