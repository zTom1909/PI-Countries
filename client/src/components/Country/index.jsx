import { Link } from "react-router-dom";
import styles from "./Country.module.css";

const Country = ({ id, name, image, continent }) => {
  return (
    <div className={styles.countryContainer}>
      <img className={styles.flag} src={image} alt={name} />
      <div className={styles.textContainer}>
        <Link className={styles.country} to={`/detail/${id}`}>
          <p>{name}</p>
        </Link>
        {/* <p className={styles.continent}>{continent}</p> */}
      </div>
    </div>
  );
};

export default Country;
