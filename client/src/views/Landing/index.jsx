import styles from "./Landing.module.css";
import {useNavigate} from "react-router-dom"

const Landing = (props) => {
  const navigate = useNavigate()
  return (
    <div className={styles.landingContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to our website!</h1>
        <button className={styles.join} onClick={() => navigate("/home")}>Join In</button>
      </div>
    </div>
  );
};

export default Landing;
