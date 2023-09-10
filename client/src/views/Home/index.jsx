import HomeComponent from "../../components/Home";
import styles from "./Home.module.css";

const Home = ({ aux }) => {
  return (
    <div className={styles.homeContainer}>
      <HomeComponent aux={aux} />
    </div>
  );
};

export default Home;
