import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import styles from "./Nav.module.css";
import { useState } from "react";

const Nav = () => {
  const [isPressed, setIsPressed] = useState({
    order: false,
    filter: false,
  });
  const navigate = useNavigate();

  return (
    <div className={styles.navContainer}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <i className="fa-solid fa-reply" />
      </button>
      <SearchBar />
      <div className={styles.order}>
        <button
          className={styles.orderButton}
          onClick={() => setIsPressed({ order: !isPressed.order })}
        >
          Order Byㅤ
          {isPressed.order ? (
            <i className="fa-solid fa-caret-up" />
          ) : (
            <i className="fa-solid fa-caret-down" />
          )}
        </button>
        <div className={isPressed.order ? styles.options : styles.invisible}>
          <button className={styles.option}>Alphabetical Ascendent</button>
          <button className={styles.option}>Alphabetical Descendent</button>
          <button className={styles.option}>Most Population</button>
          <button className={styles.option}>Least Population</button>
        </div>
      </div>
      <div className={styles.filter}>
        <button
          className={styles.filterButton}
          onClick={() => setIsPressed({ filter: !isPressed.filter })}
        >
          Filter Byㅤ
          {isPressed.filter ? (
            <i className="fa-solid fa-caret-up" />
          ) : (
            <i className="fa-solid fa-caret-down" />
          )}
        </button>
        <div className={isPressed.filter ? styles.options : styles.invisible}>
          <button className={styles.option}>Continent</button>
          <button className={styles.option}>Activities</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
