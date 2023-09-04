import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailComponent from "../../components/DetailComponent";
import styles from "./Detail.module.css";

const Detail = (props) => {
  const [country, setCountry] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/countries/${id}`
        );
        data.name
          ? setCountry(data)
          : window.alert("An error occured while fetching country data");
      } catch (error) {
        console.error(error.message);
      }
    })();
    return setCountry({});
  }, [id]);

  return (
    <div className={styles.detailContainer}>
      <DetailComponent
        id={country.id}
        name={country.name}
        image={country.image}
        region={country.region}
        capitalCity={country.capitalCity}
        subregion={country.subregion ?? "No Data"}
        area={country.area ?? "No Data"}
        population={country.population}
      />
    </div>
  );
};

export default Detail;
