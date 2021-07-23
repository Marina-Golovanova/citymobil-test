import React from "react";
import { InputSearch } from "../input-search/InputSearch";
import { Button } from "../button/Button";
import { Table } from "../table/Table";
import { ScrollToTopButton } from "../scroll-to-top-button/ScrollToTopButton";
import { Car } from "../../type";
import { InputReadonly } from "../input-readonly/InputReadonly";

import "./main-content.scss";

type ChosenCar = { car: Car; year: number };

export const MainContent: React.FC = () => {
  const [showButtonForScroll, setShowButtonToScroll] = React.useState(false);
  const [search, setSearch] = React.useState<string>("");
  const [searchValue, setSearchValue] = React.useState("");
  const [chosenCar, setChosenCar] = React.useState<ChosenCar>();

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
          <InputSearch onInput={onInput} onEnter={onSearch} />
          <Button text="Найти" onButton={onSearch} />
        </div>
      </div>
      <Table
        search={searchValue}
        onChooseCar={(car, year) => setChosenCar({ car, year })}
      />
      {showButtonForScroll && <ScrollToTopButton />}
      <InputReadonly
        text={
          chosenCar?.year
            ? `Выбран автомобиль ${chosenCar.car.mark} ${chosenCar.car.model} ${chosenCar.year} года выпуска`
            : ""
        }
      />
    </div>
  );
};
