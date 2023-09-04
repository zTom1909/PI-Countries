import axios from "axios";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  setCountries,
  page,
  setPage,
  maxPages,
  setMaxPages,
  inputValue,
  setInputValue,
}) => {
  const handleSearch = async () => {
    const request = await axios.get(
      `http://localhost:3001/countries?name=${inputValue}`
    );
    const currentMaxPages = Math.ceil(request.data.length / 10)
    setMaxPages(currentMaxPages);

    const { data } = await axios.get(
      `http://localhost:3001/countries?name=${inputValue}&page=${page}`
    );
    setCountries(data);
    page > currentMaxPages && setPage(currentMaxPages);
    page < 1 && currentMaxPages > 0 && setPage(1)
  };
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
