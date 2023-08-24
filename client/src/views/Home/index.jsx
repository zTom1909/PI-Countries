import HomeComponent from "../../components/Home";
import styles from "./Home.module.css";

const Home = ({ countries, page, setPage, maxPages }) => {
  return (
    <div className={styles.homeContainer}>
      <HomeComponent
        countries={countries}
        page={page}
        setPage={setPage}
        maxPages={maxPages}
      />
    </div>
  );
};

export default Home;
