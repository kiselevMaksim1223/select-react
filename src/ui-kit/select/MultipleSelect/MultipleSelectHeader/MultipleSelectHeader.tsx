import React, { FC } from "react";
import arrow from "../../../../assets/images/arrow.svg";
import * as styles from "./MultipleSelectHeader.module.css";
import clsx from "clsx";
import { ISelectOption } from "../MultipleSelect";
import MultipleSelectedOption from "./MultipleSelectedOption/MultipleSelectedOption";

interface ISelectHeaderMultiple {
  isOpenMenu: boolean;
  currentSelectedOption: ISelectOption[] | undefined;
  handleToggleMenu: () => void;
  handleToggleMenuOutside: () => void;
  handleRemoveSelectedOption: (option: ISelectOption) => void;
}

const SelectHeader: FC<ISelectHeaderMultiple> = ({
  currentSelectedOption,
  handleToggleMenu,
  isOpenMenu,
  handleRemoveSelectedOption,
}) => {
  return (
    <div
      role="combobox"
      className={styles.wrapper}
      onClick={handleToggleMenu}
      onKeyPress={handleToggleMenu}
      tabIndex={0}
    >
      <div className={styles.selectedOptions}>
        {currentSelectedOption?.map((el) => (
          <MultipleSelectedOption
            key={el.value}
            option={el}
            handleRemoveSelectedOption={handleRemoveSelectedOption}
          />
        ))}
      </div>
      <div className={styles.arrowWrapper}>
        <img
          src={arrow}
          className={clsx(styles.arrow, {
            [styles.arrowRotate]: !isOpenMenu,
          })}
        />
      </div>
    </div>
  );
};

export default SelectHeader;
