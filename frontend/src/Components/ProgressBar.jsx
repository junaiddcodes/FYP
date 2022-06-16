import React from "react";

const Progress = ({ done }) => {
  const [style, setStyle] = React.useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };

    setStyle(newStyle);
  }, 200);

  return (
    <div className="progress-container">
      <div className="progress">
        <div
          className={`progress-done ${
            done <= 20 || done > 105
              ? "red-bar"
              : done >= 20 && done <= 60
              ? "yellow-bar"
              : done > 60 && done < 95
              ? "green-bar"
              : done > 95
              ? "dark-green-bar"
              : ""
          } `}
          style={style}
        >
          {done}%
        </div>
      </div>
    </div>
  );
};
export default Progress;
