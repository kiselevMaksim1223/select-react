import React, { FC } from "react";
import arrow from "../../../../assets/images/arrow.svg";
import * as styles from "./MultipleSelectHeader.module.css";
import clsx from "clsx";
import { ISelectOption } from "../MultipleSelect";
import MultipleSelectedOption from "./MultipleSelectedOption/MultipleSelectedOption";

interface ISelectHeaderMultiple {
  isOpenMenu: boolean;
  currentSelectedOptions: ISelectOption[] | undefined;
  handleToggleMenu: () => void;
  handleToggleMenuOutside: () => void;
  handleRemoveSelectedOption: (option: ISelectOption) => void;
}

const SelectHeader: FC<ISelectHeaderMultiple> = ({
  currentSelectedOptions,
  handleToggleMenu,
  isOpenMenu,
  handleRemoveSelectedOption,
}) => {
  const mappedSelectedOptions = currentSelectedOptions?.map((el) => (
    <MultipleSelectedOption
      key={el.value}
      option={el}
      handleRemoveSelectedOption={handleRemoveSelectedOption}
    />
  ));
  return (
    <div
      id="combobox"
      role="combobox"
      className={styles.wrapper}
      onClick={handleToggleMenu}
      tabIndex={0}
    >
      <div className={styles.selectedOptions}>
        {!currentSelectedOptions ? (
          <span className={styles.placeholder}>Выберите значение...</span>
        ) : (
          mappedSelectedOptions
        )}
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
