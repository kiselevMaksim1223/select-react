import React, { FC } from "react";
import * as styles from "./MultipleSelectItem.module.css";
import clsx from "clsx";
import { ISelectOption } from "../MultipleSelect";
import Checkbox from "../../../Checkbox/Checkbox";

interface IMultipleSelectItem {
  currentSelectedItems?: ISelectOption[];
  value: ISelectOption;
  handleSelectedValue: (value: ISelectOption) => void;
  handleToggleCloseMenu: () => void;
  currentItemIndex: number;
  elementIndex: number;
  setCurrentItemIndex: (value: number) => void;
}

const MultipleSelectItem: FC<IMultipleSelectItem> = ({
  value,
  currentSelectedItems,
  handleSelectedValue,
  handleToggleCloseMenu,
  currentItemIndex,
  elementIndex,
  setCurrentItemIndex,
}) => {
  const handleClickOnItem = (): void => {
    handleSelectedValue(value);
    handleToggleCloseMenu();
    setCurrentItemIndex(0);
  };

  const handleHoverOnItem = (): void => {
    setCurrentItemIndex(elementIndex);
  };

  const selectedItemClassName = clsx(styles.item, {
    [styles.itemHover]: currentItemIndex === elementIndex,
  });
  return (
    <li
      role="option"
      className={selectedItemClassName}
      onClick={handleClickOnItem}
      onMouseEnter={handleHoverOnItem}
      aria-selected={currentSelectedItems?.includes(value)} // indicates that the item is selected or active
    >
      <div className={styles.content}>
        {value.label.image_src && (
          <img src={value.label.image_src} alt="" className={styles.image} />
        )}
        <p>{value.label.text}</p>
      </div>
      <Checkbox
        checked={currentSelectedItems?.includes(value)}
        onChange={handleClickOnItem}
      />
    </li>
  );
};

export default MultipleSelectItem;
