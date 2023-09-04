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
          <img className={styles.flag} src={image} alt={name} />
          <p className={styles.id}>{`${id} | ${name}`}</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.text}>{`Continent: ${region}`}</p>
          <p className={styles.text}>{`Capital City: ${capitalCity}`}</p>
          <p className={styles.text}>{`Region: ${subregion}`}</p>
          <p className={styles.text}>{`Area: ${area}m²`}</p>
          <p className={styles.text}>
            {`Population: ${population} `}{" "}
            <i className={`${styles.personSymbol} fa-regular fa-user`} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
