import React from "react";
import { useToasts } from "react-toast-notifications";
import { api } from "../../api";
import { Data, Car } from "../../type";
import { SortControl } from "../sort-control/SortControl";
import { Loader } from "../loader/Loader";

import "./table.scss";

type TableProps = {
  search: string;
  onChooseCar: (car: Car, year: number) => void;
};

export const Table: React.FC<TableProps> = (props) => {
  const [data, setData] = React.useState<Data>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [sortKey, setSortKey] = React.useState("mark");
  const [sortByAsc, setSortByAsc] = React.useState(true);
  const [filteredData, setFilteredData] = React.useState<Data>();

  const { addToast } = useToasts();

  React.useEffect(() => {
    setIsLoading(true);

    api
      .getCars()
      .then((res) => {
        setIsLoading(false);
        setData(res);
      })
      .catch((e) => {
        addToast(e.message, { appearance: "error" });
        setIsLoading(false);
      });
  }, [addToast]);

  React.useEffect(() => {
    if (!data) {
      return;
    }

    const sortedData = { ...data };

    if (props.search) {
      sortedData.cars = sortedData.cars.filter((car) =>
        `${car.mark} ${car.model}`.toLowerCase().includes(props.search)
      );
    }

    sortedData.cars = sortedData.cars.sort((a, b) => {
      const dir = sortByAsc ? 1 : -1;

      return sortKey === "mark"
        ? (`${a.mark} ${a.model}` > `${b.mark} ${b.model}` ? 1 : -1) * dir
        : ((a.tariffs[sortKey]?.year || 0) > (b.tariffs[sortKey]?.year || 0)
            ? 1
            : -1) * dir;
    });

    setFilteredData(sortedData);
  }, [data, props.search, sortByAsc, sortKey]);

  const onTitleClick = async (title: string) => {
    if (sortKey === title) {
      setSortByAsc(!sortByAsc);
    } else {
      setSortByAsc(true);
    }

    setSortKey(title);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="table">
      <div className="table__row">
        {data && (
          <>
            <div className="table__title" onClick={() => onTitleClick("mark")}>
              Марка и модель
              <SortControl
                sortBy={
                  sortKey === "mark" ? (sortByAsc ? "asc" : "desc") : null
                }
              />
            </div>
            {data.tariffsList.map((el) => (
              <div
                className="table__title"
                key={el}
                onClick={() => onTitleClick(el.toLowerCase())}
              >
                {el}
                <SortControl
                  sortBy={
                    sortKey === el.toLowerCase()
                      ? sortByAsc
                        ? "asc"
                        : "desc"
                      : null
                  }
                />
              </div>
            ))}
          </>
        )}
      </div>
      {filteredData &&
        filteredData.cars.map((el) => (
          <div className="table__row" key={`${el.mark} ${el.model}`}>
            <div
              className="table__cell"
              onClick={() => props.onChooseCar(el, 0)}
            >{`${el.mark} ${el.model}`}</div>
            {filteredData.tariffsList.map((tariff) => (
              <div
                className="table__cell"
                key={tariff}
                onClick={() =>
                  props.onChooseCar(
                    el,
                    el.tariffs[tariff.toLowerCase()]
                      ? el.tariffs[tariff.toLowerCase()].year
                      : 0
                  )
                }
              >
                {el.tariffs[tariff.toLowerCase()]?.year || "—"}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
