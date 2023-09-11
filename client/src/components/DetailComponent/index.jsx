import styles from "./Detail.module.css";

const DetailComponent = ({
  id,
  name,
  image,
  region,
  capitalCity,
  subregion,
  area,
  population,
}) => {
  return (
    <div className={styles.globalContainer}>
      <div className={styles.detailContainer}>
        <div className={styles.imageContainer}>
          <p className={styles.id}>{id}</p>
          <img className={styles.flag} src={image} alt={name} />
          <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            <i className="fa-solid fa-earth-americas" />
            {`Continent: ${region}`}
          </p>
          <p className={styles.text}>
            <i className="fa-solid fa-map-pin" />
            {`Region: ${subregion}`}
          </p>
          <p className={styles.text}>
            <i className="fa-solid fa-city" />
            {`Capital City: ${capitalCity}`}
          </p>
          <p className={styles.text}>
            <i className="fa-solid fa-sign-hanging" />
            {`Area: ${area}m²`}
          </p>
          <p className={styles.text}>
            <i className="fa-solid fa-user-group" />
            {`Population: ${population} `}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
