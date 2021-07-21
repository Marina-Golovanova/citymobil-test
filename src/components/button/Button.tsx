import React from "react";

import "./button.scss";

type ButtonProps = { text: string; onButton: () => void };

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className="button" onClick={props.onButton}>
      {props.text}
    </button>
  );
};
