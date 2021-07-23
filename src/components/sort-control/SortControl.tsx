import React from "react";

import "./sort-control.scss";

type SortControlProps = {
  sortBy?: "asc" | "desc" | null;
};

export const SortControl: React.FC<SortControlProps> = (props) => {
  return (
    <svg className={`sort-control ${props.sortBy}`} viewBox="0 0 12 14">
      <path
        d="M11.8333 5.5H8.49996V0.5H3.49996V5.5H0.166626L5.99996 11.3333L11.8333 5.5ZM0.166626 13V14.6667H11.8333V13H0.166626Z"
        fill="#7B8395"
      />
    </svg>
  );
};
