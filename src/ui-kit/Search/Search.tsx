import React, { FC } from "react";
import * as styles from "./Search.module.css";
import search from "../../assets/images/search.svg";

interface ISearch {
  searchText: string;
  handleSearchText: (text: string) => void;
}

const Search: FC<ISearch> = ({ searchText, handleSearchText }) => {
  return (
    <div className={styles.inputWrapper}>
      <img src={search} alt="search" className={styles.searchIcon} />
      <input
        id="search-input"
        placeholder="Поиск"
        className={styles.input}
        onChange={(e) => handleSearchText(e.target.value)}
        value={searchText}
      />
    </div>
  );
};

export default Search;
