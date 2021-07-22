import React from "react";
import { useToasts } from "react-toast-notifications";
import { api } from "../../api";
import { Data } from "../../type";

import "./table.scss";

type TableProps = {
  search: string;
};

export const Table: React.FC<TableProps> = (props) => {
  const [data, setData] = React.useState<Data>();

  const { addToast } = useToasts();

  React.useEffect(() => {
    api
      .getCars()
      .then((res) => {
        setData(res);
      })
      .catch((e) => addToast(e.message, { appearance: "error" }));
  }, [addToast]);

  const filteredData =
    data && props.search
      ? {
          ...data,
          cars: data.cars.filter(
            (car) =>
              car.mark.toLowerCase().includes(props.search) ||
              car.model.toLowerCase().includes(props.search)
          ),
        }
      : data;

  return (
    <div className="table">
      <div className="table__row">
        {data && (
          <>
            <div className="table__title">Марка и модель</div>
            {data.tariffsList.map((el) => (
              <div className="table__title" key={el}>
                {el}
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
              <div className="table__cell" key={tariff}>
                {el.tariffs[tariff.toLowerCase()]?.year || "—"}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
