import React from "react";
import { InputSearch } from "../input-search/InputSearch";
import { Button } from "../button/Button";
import { Table } from "../table/Table";
import { ScrollToTopButton } from "../scroll-to-top-button/ScrollToTopButton";

import "./main-content.scss";

export const MainContent: React.FC = () => {
  const [showButtonForScroll, setShowButtonToScroll] = React.useState(false);

  window.onscroll = () => {
    window.scrollY > 300
      ? setShowButtonToScroll(true)
      : setShowButtonToScroll(false);
  };

  return (
    <div className="main-content">
      <div className="main-content__search-layout">
        <div className="main-content__search">
          <InputSearch />
          <Button text="Найти" onButton={() => {}} />
        </div>
      </div>
      <Table />
      {showButtonForScroll && <ScrollToTopButton />}
    </div>
  );
};
