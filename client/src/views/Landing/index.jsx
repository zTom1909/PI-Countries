import LandingComponent from "../../components/LandingComponent";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <LandingComponent />
    </div>
  );
};

export default Landing;
