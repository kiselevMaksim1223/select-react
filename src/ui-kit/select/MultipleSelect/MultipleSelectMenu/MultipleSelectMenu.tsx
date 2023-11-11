import React, { FC } from "react";
import * as styles from "./MultipleSelectMenu.module.css";
import { ISelectOption } from "../MultipleSelect";
import MultipleSelectItem from "../MultipleSelectItem/MultipleSelectItem";
import Search from "../../../Search/Search";

interface ISelectMenuMultiple {
  selectedValues: ISelectOption[] | undefined;
  handleSelectedValue: (value: ISelectOption) => void;
  options: ISelectOption[];
  isOpen: boolean;
  className?: string;
  handleToggleCloseMenu: () => void;
  currentItemIndex: number;
  setCurrentItemIndex: (value: number) => void;
  searchText: string;
  handleSearchText: (value: string) => void;
}

type ISelectMenu = ISelectMenuMultiple;

const MultipleSelectMenu: FC<ISelectMenu> = ({
  selectedValues,
  handleSelectedValue,
  options,
  isOpen,
  handleToggleCloseMenu,
  currentItemIndex,
  setCurrentItemIndex,
  searchText,
  handleSearchText,
}) => {
  if (!isOpen) return null;

  const mappedSelectItems = options.map((el, index) => (
    <MultipleSelectItem
      key={el.value}
      value={el}
      elementIndex={index}
      handleSelectedValue={handleSelectedValue}
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
      <Search searchText={searchText} handleSearchText={handleSearchText} />
      {mappedSelectItems.length === 0 ? (
        <div className={styles.notFound}>Ничего не найдено</div>
      ) : (
        mappedSelectItems
      )}
    </ul>
  );
};

export default MultipleSelectMenu;
