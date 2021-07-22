import React from "react";
import { InputSearch } from "../input-search/InputSearch";
import { Button } from "../button/Button";
import { Table } from "../table/Table";
import { ScrollToTopButton } from "../scroll-to-top-button/ScrollToTopButton";

import "./main-content.scss";

export const MainContent: React.FC = () => {
  const [showButtonForScroll, setShowButtonToScroll] = React.useState(false);
  const [search, setSearch] = React.useState<string>("");
  const [searchValue, setSearchValue] = React.useState("");

  window.onscroll = () => {
    window.scrollY > 300
      ? setShowButtonToScroll(true)
      : setShowButtonToScroll(false);
  };

  const onSearch = () => {
    setSearchValue(search);
  };

  const onInput = (search: string) => {
    if (!search) {
      setSearchValue("");
    } else {
      setSearch(search);
    }
  };

  return (
    <div className="main-content">
      <div className="main-content__search-layout">
        <div className="main-content__search">
          <InputSearch onInput={onInput} />
          <Button text="Найти" onButton={onSearch} />
        </div>
      </div>
      <Table search={searchValue} />
      {showButtonForScroll && <ScrollToTopButton />}
    </div>
  );
};
