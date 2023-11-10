import React, { FC } from "react";
import * as styles from "./MultipleSelectedOption.module.css";
import { ISelectOption } from "../../MultipleSelect";

interface ISelectedOption {
  option: ISelectOption;
  handleRemoveSelectedOption: (option: ISelectOption) => void;
}

const MultipleSelectedOption: FC<ISelectedOption> = ({
  option,
  handleRemoveSelectedOption,
}) => {
  return (
    <button
      className={styles.selectedOption}
      onClick={() => handleRemoveSelectedOption(option)}
    >
      {option.label.text}
      <span>&times;</span>
    </button>
  );
};

export default MultipleSelectedOption;
