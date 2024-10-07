import React, { useState, useEffect } from "react";

export const NumberCounter = ({ max, delay }) => {
  const [count, setCount] = useState(24000);

  useEffect(() => {
    let now = 200;
    const interval = setInterval(() => {
      setCount(Math.ceil(max - now));
      if (now <= 0) {
        clearInterval(interval);
      }
      const step = now / 10;
      now -= step;
    }, delay);

    // cleanup function to clear interval on component unmount
    return () => clearInterval(interval);
  }, [max]);

  // Initial delay using setTimeout
  useEffect(() => {}, [delay]);

  return <span className="font-semibold text-md">{count}</span>;
};
