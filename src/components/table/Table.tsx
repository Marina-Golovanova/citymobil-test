import React from "react";
import { useToasts } from "react-toast-notifications";
import { api } from "../../api";
import { Data, Car } from "../../type";
import { SortControl } from "../sort-control/SortControl";

import "./table.scss";

type TableProps = {
  search: string;
  onChooseCar: (car: Car, year: number) => void;
};

export const Table: React.FC<TableProps> = (props) => {
  const [data, setData] = React.useState<Data>();
  const [sortKey, setSortKey] = React.useState("");
  const [sortByAsc, setSortByAsc] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState<Data>();
  //const [chosenCar, setChosenCar] = React.useState<Car>();

  const { addToast } = useToasts();

  React.useEffect(() => {
    api
      .getCars()
      .then((res) => {
        setData(res);
      })
      .catch((e) => addToast(e.message, { appearance: "error" }));
  }, [addToast]);

  React.useEffect(
    () =>
      setFilteredData(
        data && props.search
          ? {
              ...data,
              cars: data.cars.filter((car) =>
                `${car.mark} ${car.model}`.toLowerCase().includes(props.search)
              ),
            }
          : data
      ),
    [data, props.search]
  );

  //   const onSort = () => {
  //     if (filteredData) {
  //       //debugger;
  //       if (sortKey === "mark" && sortByAsc) {
  //         setFilteredData({
  //           ...filteredData,
  //           cars: filteredData.cars.sort((a, b) => (a.mark > b.mark ? 1 : -1)),
  //         });
  //       } else if (sortKey === "mark" && !sortByAsc) {
  //         setFilteredData({
  //           ...filteredData,
  //           cars: filteredData.cars.sort((a, b) => (a.mark > b.mark ? -1 : 1)),
  //         });
  //       } else if (sortKey !== "mark" && sortByAsc) {
  //         setFilteredData({
  //           ...filteredData,
  //           cars: filteredData.cars.sort((a, b) =>
  //             (a.tariffs[sortKey] ? a.tariffs[sortKey].year : 0) >
  //             (b.tariffs[sortKey] ? b.tariffs[sortKey].year : 0)
  //               ? 1
  //               : -1
  //           ),
  //         });
  //       } else if (sortKey !== "mark" && !sortByAsc) {
  //         setFilteredData({
  //           ...filteredData,
  //           cars: filteredData.cars.sort((a, b) =>
  //             (a.tariffs[sortKey] ? a.tariffs[sortKey].year : 0) >
  //             (b.tariffs[sortKey] ? b.tariffs[sortKey].year : 0)
  //               ? -1
  //               : 1
  //           ),
  //         });
  //       }
  //     }
  //   };

  const onTitleClick = async (title: string) => {
    if (title !== sortKey) {
      setSortByAsc(true);
    } else {
      setSortByAsc(!sortByAsc);
    }
    setSortKey(title);
  };

  React.useEffect(() => {
    if (data) {
      if (sortKey === "mark" && sortByAsc) {
        setFilteredData({
          ...data,
          cars: data.cars.sort((a, b) => (a.mark > b.mark ? 1 : -1)),
        });
      } else if (sortKey === "mark" && !sortByAsc) {
        setFilteredData({
          ...data,
          cars: data.cars.sort((a, b) => (a.mark > b.mark ? -1 : 1)),
        });
      } else if (sortKey !== "mark" && sortByAsc) {
        setFilteredData({
          ...data,
          cars: data.cars.sort((a, b) =>
            (a.tariffs[sortKey] ? a.tariffs[sortKey].year : 0) >
            (b.tariffs[sortKey] ? b.tariffs[sortKey].year : 0)
              ? 1
              : -1
          ),
        });
      } else if (sortKey !== "mark" && !sortByAsc) {
        setFilteredData({
          ...data,
          cars: data.cars.sort((a, b) =>
            (a.tariffs[sortKey] ? a.tariffs[sortKey].year : 0) >
            (b.tariffs[sortKey] ? b.tariffs[sortKey].year : 0)
              ? -1
              : 1
          ),
        });
      }
    }
  }, [data, sortByAsc, sortKey]);

  return (
    <div className="table">
      <div className="table__row">
        {data && (
          <>
            <div className="table__title" onClick={() => onTitleClick("mark")}>
              Марка и модель{" "}
              <SortControl
                sortBy={
                  sortKey === "mark" ? (sortByAsc ? "asc" : "desc") : null
                }
                onSort={() => {}}
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
                  onSort={() => {}}
                />
              </div>
            ))}
          </>
        )}
      </div>
      {filteredData &&
        filteredData.cars.map((el) => (
          <div className="table__row" key={`${el.mark} ${el.model}`}>
            <div className="table__cell">{`${el.mark} ${el.model}`}</div>
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
