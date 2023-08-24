import { useEffect, useState } from "react";
import axios from "axios";
import Country from "../Country";
import styles from "./Home.module.css";

const Home = (props) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3001/countries`);
      const countries = data.slice(0, 5)
      setCountries(countries);
    })();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {countries.length &&
        countries.map(({ id, name, image, region }) => (
          <Country key={id} id={id} name={name} image={image} continent={region} />
        ))}
    </div>
  );
};

export default Home;
