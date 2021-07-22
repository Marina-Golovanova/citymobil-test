import React from "react";

import "./input-search.scss";

type InputSearchProps = { onInput: (search: string) => void };

export const InputSearch: React.FC<InputSearchProps> = (props) => {
  const [inputValue, setInputValue] = React.useState("");

  const onChangeInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  props.onInput(inputValue.toLowerCase());

  return (
    <div className="input-layout">
      <input
        className="input-layout__field"
        placeholder="Поиск"
        onChange={onChangeInput}
      />
      <svg className="input-layout__icon" viewBox="0 0 16 16" fill="none">
        <path
          d="M9.58388 3.36469C11.268 5.04878 11.268 7.77924 9.58388 9.46333C7.89978 11.1474 5.16933 11.1474 3.48524 9.46333C1.80114 7.77924 1.80114 5.04878 3.48524 3.36469C5.16933 1.6806 7.89978 1.6806 9.58388 3.36469"
          stroke="#7B8395"
          strokeWidth="1.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.55273 9.48819L13.7777 13.771"
          stroke="#7B8395"
          strokeWidth="1.625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
