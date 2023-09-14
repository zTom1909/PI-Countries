import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import validate from "../../resources/functions/activityValidate";
import { setCountries } from "../../redux/actions";
import styles from "./FormComponent.module.css";

const FormComponent = () => {
  const email = useSelector((state) => state.email);
  const dispatch = useDispatch();

  const [activityData, setActivityData] = useState({
    name: "",
    difficulty: 1,
    duration: "",
    season: "Verano",
    countries: [],
    countriesSearchbar: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    duration: "",
    countriesSearchbar: "",
  });

  const createActivity = async (data) => {
    try {
      if (!email) return alert("You need an account to create activities!");
      const durationArray = data.duration.split(":");
      const fixedDuration =
        Number(durationArray[0]) * 60 + Number(durationArray[1]);
      const fixedIds = data.countries.map((country) => country.id).join(",");
      await axios.post(
        `http://localhost:3001/activities?id=${fixedIds}&email=${email}`,
        {
          name: data.name,
          difficulty: data.difficulty,
          duration: fixedDuration,
          season: data.season,
        }
      );
      alert("Activity created succesfully");
      setActivityData({
        name: "",
        difficulty: 1,
        duration: "",
        season: "Verano",
        countries: [],
        countriesSearchbar: "",
      });
      dispatch(setCountries("", email));
    } catch (error) {
      alert(error.response?.data?.error);
      console.error(error);
    }
  };

  const handleSeason = (season) => {
    setActivityData({ ...activityData, season });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newData = { [name]: value };
    setActivityData({ ...activityData, ...newData });
    setErrors({ ...validate(newData, activityData.countries) });
  };

  const handleKeyPress = async (event) => {
    const { key } = event;
    if (key === "Backspace" && !activityData.countriesSearchbar.length)
      return removeCountry(activityData.countries.length - 1);
    if (key === "Enter") {
      event.preventDefault();
      if (!activityData.countriesSearchbar) return;
      const { data } = await axios.get(
        `http://localhost:3001/countries/${activityData.countriesSearchbar.toUpperCase()}`
      );
      if (!data?.id) {
        setActivityData({ ...activityData, countriesSearchbar: "" })
        return alert("Country not found!");
      }
      const { image, id } = data;
      setActivityData({
        ...activityData,
        countriesSearchbar: "",
        countries: [...activityData.countries, { image, id }],
      });
      setErrors({ ...errors, countriesSearchbar: "" });
    }
  };

  const removeCountry = (index) => {
    const filteredCountries = [...activityData.countries];
    filteredCountries.splice(index, 1);
    setActivityData({ ...activityData, countries: filteredCountries });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errorsHandler = validate(activityData, activityData.countries);
    setErrors(errorsHandler);
    const errorsArray = Object.keys(errorsHandler);
    if (errorsArray.length)
      return alert("Errors found, please fix them and try again!");

    createActivity(activityData);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.activity}>
        <h2 className={styles.title}>Create Activity</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>
            Activity Name
          </label>
          <div className={styles.inputField}>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Write the name of the Activity"
              value={activityData.name}
              onChange={handleChange}
            />
            {errors.name?.length ? (
              <span className={styles.warning}>
                <i className="fa-solid fa-circle-exclamation" />
                <span className={styles.bubble}>{errors.name}</span>
                <span className={styles.pointer} />
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="difficulty" className={styles.label}>
            Difficulty and Duration
          </label>
          <div className={styles.combinedContent}>
            <div className={styles.sliderContainer}>
              <div className={styles.difficultyContainer}>
                <span
                  className={`${styles.difficultyValue} ${
                    styles[`dif${activityData.difficulty}`]
                  }`}
                >
                  {activityData.difficulty}
                </span>
                <span
                  className={`${styles.difficultyStar} ${
                    styles[`dif${activityData.difficulty}`]
                  }`}
                >
                  <i className="fa-solid fa-star" />
                </span>
              </div>
              <input
                className={`${styles.input} ${styles.slider}`}
                type="range"
                name="difficulty"
                min="1"
                value={activityData.difficulty}
                max="5"
                step="1"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <input
                className={styles.duration}
                type="text"
                name="duration"
                placeholder="10:00"
                value={activityData.duration}
                onChange={handleChange}
              />
              {errors.duration?.length ? (
                <span className={styles.warning}>
                  <i className="fa-solid fa-circle-exclamation" />
                  <span className={styles.bubble}>{errors.duration}</span>
                  <span className={styles.pointer} />
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className={styles.seasonContainer}>
          <label htmlFor="season" className={styles.label}>
            Activity Season
          </label>
          <div className={styles.seasonEmojis}>
            <span
              className={`${styles.season} ${
                activityData.season === "Verano"
                  ? styles.isSummer
                  : styles.isNotSummer
              }`}
              onClick={() => handleSeason("Verano")}
            >
              <i
                className="fa-solid fa-sun"
                onClick={() => handleSeason("Verano")}
              />
            </span>
            <span
              className={`${styles.season} ${
                activityData.season === "Otoño"
                  ? styles.isAutumn
                  : styles.isNotAutumn
              }`}
              onClick={() => handleSeason("Otoño")}
            >
              <i
                className="fa-brands fa-canadian-maple-leaf"
                onClick={() => handleSeason("Otoño")}
              />
            </span>
            <span
              className={`${styles.season} ${
                activityData.season === "Invierno"
                  ? styles.isWinter
                  : styles.isNotWinter
              }`}
              onClick={() => handleSeason("Invierno")}
            >
              <i
                className="fa-regular fa-snowflake"
                onClick={() => handleSeason("Invierno")}
              />
            </span>
            <span
              className={`${styles.season} ${
                activityData.season === "Primavera"
                  ? styles.isSpring
                  : styles.isNotSpring
              }`}
              onClick={() => handleSeason("Primavera")}
            >
              <i
                className="fa-solid fa-seedling"
                onClick={() => handleSeason("Primavera")}
              />
            </span>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="countries" className={styles.label}>
            Add to Countries
          </label>
          <div className={styles.inputField}>
            <div className={styles.countriesContainer}>
              {activityData.countries.map((country, index) => (
                <span key={index} className={styles.country}>
                  <img src={country.image} alt={country.id} />
                  <p>{country.id}</p>
                  <span onClick={() => removeCountry(index)}>X</span>
                </span>
              ))}
              <input
                className={styles.inputCountry}
                type="text"
                name="countriesSearchbar"
                placeholder={
                  activityData.countries.length
                    ? ""
                    : "Write the countries to add this activity to"
                }
                value={activityData.countriesSearchbar}
                autoComplete="off"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
            </div>
            {errors.countriesSearchbar?.length ? (
              <span className={styles.warning}>
                <i className="fa-solid fa-circle-exclamation" />
                <span className={styles.bubble}>
                  {errors.countriesSearchbar}
                </span>
                <span className={styles.pointer} />
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <button type="submit" className={styles.submit}>
          CREATE ACTIVITY
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
