import SearchBar from "../SearchBar";
import styles from "./Nav.module.css";

const Nav = ({
  setCountries,
  page,
  setMaxPages,
  inputValue,
  setInputValue,
}) => {
  return (
    <div className={styles.navContainer}>
      <SearchBar
        setCountries={setCountries}
        page={page}
        setMaxPages={setMaxPages}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
};

export default Nav;
