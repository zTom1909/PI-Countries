import Country from "../Country";
import styles from "./Home.module.css";

const Home = ({ countries, page, setPage, maxPages }) => {
  const handlePage = (event) => {
    const type = event.target.name;
    // eslint-disable-next-line default-case
    switch (type) {
      case "prev":
        page > 1 && setPage(page - 1);
        break;
      case "next":
        page < maxPages && setPage(page + 1);
        break;
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.countriesContainer}>
        {countries[0] &&
          countries.map(({ id, name, image, region }) => (
            <Country
              key={id}
              id={id}
              name={name}
              image={image}
              continent={region}
            />
          ))}
      </div>
      <div className={styles.pages}>
        <button
          className={`${styles.pageButton} ${styles.prevButton}`}
          onClick={handlePage}
          name="prev"
        >
          PREV
        </button>
        <p className={styles.pageNumber}>{`${page} / ${maxPages}`}</p>
        <button
          className={`${styles.pageButton} ${styles.nextButton}`}
          onClick={handlePage}
          name="next"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Home;
