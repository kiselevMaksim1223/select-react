import React, { FC } from "react";

import * as styles from "./MultipleSelectMenu.module.css";
import { ISelectOption } from "../MultipleSelect";
import MultipleSelectItem from "../MultipleSelectItem/MultipleSelectItem";

interface ISelectMenuMultiple {
  selectedValues: ISelectOption[] | undefined;
  handleSelectedValue: (value: ISelectOption[]) => void;
  options: ISelectOption[];
  isOpen: boolean;
  className?: string;
  handleToggleCloseMenu: () => void;
  currentItemIndex: number;
  setCurrentItemIndex: (value: number) => void;
}

type ISelectMenu = ISelectMenuMultiple;

const SelectMenu: FC<ISelectMenu> = ({
  selectedValues,
  handleSelectedValue,
  options,
  isOpen,
  className,
  handleToggleCloseMenu,
  currentItemIndex,
  setCurrentItemIndex,
}) => {
  if (!isOpen) return null;

  const selectOption = (option: ISelectOption) => {
    const values = selectedValues ?? [];
    if (values?.includes(option)) {
      handleSelectedValue(values.filter((o) => o !== option));
    } else {
      handleSelectedValue([...values, option]);
    }
  };

  const mappedSelectItems = options.map((el) => (
    <MultipleSelectItem
      key={el.value}
      value={el}
      handleSelectedValue={selectOption}
      currentSelectedItems={selectedValues}
      handleToggleCloseMenu={handleToggleCloseMenu}
      currentItemIndex={currentItemIndex}
      setCurrentItemIndex={setCurrentItemIndex}
    />
  ));

  return (
    <ul
      id="combobox-list"
      role="listbox"
      aria-expanded={isOpen}
      className={styles.main}
    >
      {mappedSelectItems}
    </ul>
  );
};

export default SelectMenu;
