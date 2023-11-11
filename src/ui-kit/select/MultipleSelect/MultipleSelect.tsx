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
  const [searchText, setSearchText] = useState<string>("");
  const [searchOptions, setSearchOptions] = useState(options);

  const selectMenuRef = useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    setIsOpenItemsMenu((prev) => !prev);
  };

  const handleToggleCloseMenu = () => {
    setIsOpenItemsMenu(false);
    setCurrentItemIndex(0);
    setSearchText("");
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

  // search
  useEffect(() => {
    const newOptions = options.filter((el) =>
      el.label.text.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setSearchOptions(newOptions);
  }, [searchText]);

  // keyboard navigation
  useEffect(() => {
    if (isOpenItemsMenu) {
      const input = document.getElementById("search-input")!;
      const select = document.getElementById("combobox")!;

      window.onscroll = () => {
        // select.blur();
        // handleToggleCloseMenu();
      };
      document.onkeydown = (e) => {
        const keyCode = e.code;

        if (keyCode === "Enter" && currentItemIndex >= 0) {
          searchOptions[currentItemIndex] &&
            selectOption(searchOptions[currentItemIndex]);
          handleToggleCloseMenu();
          setCurrentItemIndex(0);
        }
        if (keyCode === "ArrowUp" && searchOptions[currentItemIndex - PREV]) {
          setCurrentItemIndex(currentItemIndex - PREV);
        }
        if (keyCode === "ArrowDown" && searchOptions[currentItemIndex + NEXT]) {
          input.blur();
          setCurrentItemIndex(currentItemIndex + NEXT);
        }
        if (keyCode === "Escape" || currentItemIndex < 0) {
          handleToggleCloseMenu();
        }
      };
    } else {
      const input = document.getElementById("search-input")!;
      document.onkeydown = (e) => {
        const keyCode = e.code;
        if (
          keyCode === "Enter" ||
          (keyCode === "Space" && !isOpenItemsMenu) ||
          keyCode === "ArrowDown"
        ) {
          input && input.focus();
          handleToggleMenu();
        } else {
          return true;
        }
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
        handleSelectedValue={selectOption}
        options={searchOptions}
        handleToggleCloseMenu={handleToggleCloseMenu}
        currentItemIndex={currentItemIndex}
        setCurrentItemIndex={setCurrentItemIndex}
        searchText={searchText}
        handleSearchText={setSearchText}
      />
    </div>
  );
};

export default MultipleSelect;
