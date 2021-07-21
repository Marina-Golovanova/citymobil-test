import React from "react";
import { useToasts } from "react-toast-notifications";
import { api } from "../../api";
import { Data } from "../../type";

import "./table.scss";

export const Table: React.FC = () => {
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
    </div>
  );
};
