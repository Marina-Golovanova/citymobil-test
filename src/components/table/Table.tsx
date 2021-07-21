import React from "react";
import { api } from "../../api";
import { Data } from "../../type";

import "./table.scss";

export const Table: React.FC = () => {
  const [data, setData] = React.useState<Data>();

  React.useEffect(() => {
    api.getCars().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="table">
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
  );
};
