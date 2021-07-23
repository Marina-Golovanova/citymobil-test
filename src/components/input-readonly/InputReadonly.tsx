import React from "react";

import "./input-readonly.scss";

type InputReadonlyProps = { text: string };

export const InputReadonly: React.FC<InputReadonlyProps> = (props) => {
  return <div className="input-readonly">{props.text}</div>;
};
