import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCountries } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => dispatch(setCountries(inputValue));
  const handleInputChange = (event) => setInputValue(event.target.value);
  const handleKeyPress = ({ key }) => key === "Enter" && handleSearch();

  return (
    <div className={styles.searchBarContainer}>
      <input
        className={styles.searchInput}
        type="search"
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type the name of a Country"
        value={inputValue}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};

export default SearchBar;
