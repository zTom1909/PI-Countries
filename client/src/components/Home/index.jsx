import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Country from "../Country";
import styles from "./Home.module.css";

const Home = ({ aux }) => {
  const [page, setPage] = useState(1);
  const filteredCountries = useSelector((state) => state.filteredCountries);
  const countries = filteredCountries.slice(page * 10 - 10, page * 10);
  const maxPages = Math.ceil(filteredCountries.length / 10);

  useEffect(() => {
    page > maxPages && setPage(maxPages);
    page < 1 && maxPages > 0 && setPage(1);
  }, [aux, page, maxPages]);

  const handlePage = (event) => {
    const type = event.target.name;
    switch (type) {
      case "prev":
        page > 1 && setPage(page - 1);
        break;
      case "next":
        page < maxPages && setPage(page + 1);
        break;
      default:
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
