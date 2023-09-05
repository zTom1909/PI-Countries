import HomeComponent from "../../components/Home";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <HomeComponent />
    </div>
  );
};

export default Home;
