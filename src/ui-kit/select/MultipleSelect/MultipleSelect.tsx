import React, { FC, useEffect, useRef, useState } from "react";
import * as styles from "./MultipleSelect.module.css";
import MultipleSelectHeader from "./MultipleSelectHeader/MultipleSelectHeader";
import MultipleSelectMenu from "./MultipleSelectMenu/MultipleSelectMenu";
import useClickOutside from "../../../common/hooks/useClickOutside";

export interface ISelectOption {
  label: { text: string; image_src?: string };
  value: number | string;
}

interface IMultipleSelect {
  options: ISelectOption[];
  className?: string;
  value?: ISelectOption[];
  onChange: (value: ISelectOption[]) => void;
}

const PREV = 1;
const NEXT = 1;

const MultipleSelect: FC<IMultipleSelect> = ({ value, options, onChange }) => {
  const [isOpenItemsMenu, setIsOpenItemsMenu] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const selectMenuRef = useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    setIsOpenItemsMenu((prev) => !prev);
  };

  const handleToggleCloseMenu = () => {
    setIsOpenItemsMenu(false);
    setCurrentItemIndex(0);
  };

  useClickOutside(selectMenuRef, handleToggleCloseMenu);

  const selectOption = (option: ISelectOption) => {
    const values = value ?? [];
    if (values?.includes(option)) {
      onChange(values.filter((o) => o !== option));
    } else {
      onChange([...values, option]);
    }
  };

  useEffect(() => {
    if (isOpenItemsMenu) {
      const test = window.scrollY;
      const select = document.getElementById("combobox-list")!;

      const selectOptions = Array.from(select.querySelectorAll("li"));

      if (currentItemIndex >= 0 && select) {
        const selectOptions = Array.from(select.querySelectorAll("li"));

        selectOptions[currentItemIndex].scrollIntoView({ block: "nearest" });
      }

      window.onscroll = () => {
        window.scroll(0, test);
      };
      document.onkeydown = (e) => {
        const keyCode = e.code;

        e.preventDefault();
        if (keyCode === "Enter" && currentItemIndex >= 0) {
          selectOption(options[currentItemIndex]);
          handleToggleCloseMenu();
          setCurrentItemIndex(0);
        }
        if (keyCode === "ArrowUp" && options[currentItemIndex - PREV]) {
          setCurrentItemIndex(currentItemIndex - PREV);
        }
        if (keyCode === "ArrowDown" && options[currentItemIndex + NEXT]) {
          setCurrentItemIndex(currentItemIndex + NEXT);
        }
        if (keyCode !== "Escape" && currentItemIndex >= 0) {
          selectOptions[currentItemIndex].scrollIntoView({ block: "nearest" });
        }
        if (keyCode === "Escape" || currentItemIndex < 0) {
          handleToggleCloseMenu();
        }
      };
    } else {
      document.onkeydown = (e) => {
        const keyCode = e.code;
        if (keyCode === "ArrowUp" || keyCode === "ArrowDown") return true;
      };
      window.onscroll = () => {
        return true;
      };
    }
  }, [isOpenItemsMenu, options, value, handleToggleCloseMenu]);

  return (
    <div className={styles.mainWrapper} ref={selectMenuRef}>
      <MultipleSelectHeader
        isOpenMenu={isOpenItemsMenu}
        currentSelectedOptions={value}
        handleToggleMenu={handleToggleMenu}
        handleToggleMenuOutside={handleToggleCloseMenu}
        handleRemoveSelectedOption={(option: ISelectOption) =>
          selectOption(option)
        }
      />
      <MultipleSelectMenu
        isOpen={isOpenItemsMenu}
        selectedValues={value}
        handleSelectedValue={onChange}
        options={options}
        handleToggleCloseMenu={handleToggleCloseMenu}
        currentItemIndex={currentItemIndex}
        setCurrentItemIndex={setCurrentItemIndex}
      />
    </div>
  );
};

export default MultipleSelect;
