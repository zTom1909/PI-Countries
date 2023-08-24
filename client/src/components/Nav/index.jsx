import SearchBar from "../SearchBar";
import styles from "./Nav.module.css";

const Nav = (props) => {
  return (
    <div className={styles.navContainer}>
      <SearchBar />
    </div>
  );
};

export default Nav;
