import React from "react";
import { InputSearch } from "../input-search/InputSearch";
import { Button } from "../button/Button";
import { Table } from "../table/Table";

import "./main-content.scss";

export const MainContent: React.FC = () => {
  return (
    <div className="main-content">
      <div className="main-content__search">
        <InputSearch />
        <Button text="Найти" onButton={() => {}} />
      </div>
      <Table />
    </div>
  );
};
