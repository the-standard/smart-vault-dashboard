import React, { useEffect, useState } from "react";

const ChangingProgressProvider = ({ interval, values, children }) => {
  const [valuesIndex, setValuesIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setValuesIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval, values.length]);

  return children(values[valuesIndex]);
};

ChangingProgressProvider.defaultProps = {
  interval: 1000,
};

export default ChangingProgressProvider;
