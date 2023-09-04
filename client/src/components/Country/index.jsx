import { useNavigate } from "react-router-dom";
import styles from "./Country.module.css";

const Country = ({ id, name, image, continent }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.countryContainer}>
      <img
        className={styles.flag}
        src={image}
        alt={name}
        onClick={() => navigate(`/detail/${id}`)}
      />
      <button className={styles.addActivity}>+</button>
      <div
        className={styles.textContainer}
        onClick={() => navigate(`/detail/${id}`)}
      >
        <p className={styles.country}>{name}</p>
      </div>
    </div>
  );
};

export default Country;
