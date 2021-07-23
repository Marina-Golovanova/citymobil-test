import React from "react";

import "./loader.scss";

export const Loader: React.FC = () => {
  return (
    <div className="ph-item">
      <div className="ph-col-12">
        <div className="ph-row">
          <div className="ph-col-12 big" />
          <div className="ph-col-12 big" />
          <div className="ph-col-12 big" />
          <div className="ph-col-12 big" />
          <div className="ph-col-12 big" />
        </div>
      </div>
    </div>
  );
};
