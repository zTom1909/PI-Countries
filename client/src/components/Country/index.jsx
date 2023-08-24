import { Link } from "react-router-dom";
import styles from "./Country.module.css";

const Country = ({ id, name, image, continent }) => {
  return (
    <div className={styles.countryContainer}>
      <Link to={`/detail/${id}`}>
        <img className={styles.flag} src={image} alt={name} />
        <div className={styles.textContainer}>
          <p className={styles.country}>{name}</p>
          {/* <p className={styles.continent}>{continent}</p> */}
        </div>
      </Link>
    </div>
  );
};

export default Country;
