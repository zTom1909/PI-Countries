import { useState } from "react";
import styles from "./FormComponent.module.css";

const FormComponent = () => {
  const [activityData, setActivityData] = useState({
    name: "",
    difficulty: 1,
    duration: "",
    season: "Summer",
    countries: "",
  });
  const [isPressed, setIsPressed] = useState("summer");

  const handleSeason = (season) => {
    setIsPressed(season)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.activity}>
        <h2 className={styles.title}>Create Activity</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>
            Activity Name
          </label>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Write the name of the Activity"
            value={activityData.name}
            onChange={handleChange}
          />
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
            <input
              className={styles.duration}
              type="text"
              name="duration"
              placeholder="10:00"
              value={activityData.duration}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.seasonContainer}>
          <label htmlFor="season" className={styles.label}>
            Activity Season
          </label>
          <div className={styles.seasonEmojis}>
            <span
              className={`${styles.season} ${
                isPressed === "summer" ? styles.isSummer : styles.isNotSummer
              }`}
              onClick={() => handleSeason("summer")}
            >
              <i
                className="fa-solid fa-sun"
                onClick={() => handleSeason("summer")}
              />
            </span>
            <span
              className={`${styles.season} ${
                isPressed === "autumn" ? styles.isAutumn : styles.isNotAutumn
              }`}
              onClick={() => handleSeason("autumn")}
            >
              <i
                className="fa-brands fa-canadian-maple-leaf"
                onClick={() => handleSeason("autumn")}
              />
            </span>
            <span
              className={`${styles.season} ${
                isPressed === "winter" ? styles.isWinter : styles.isNotWinter
              }`}
              onClick={() => handleSeason("winter")}
            >
              <i
                className="fa-regular fa-snowflake"
                onClick={() => handleSeason("winter")}
              />
            </span>
            <span
              className={`${styles.season} ${
                isPressed === "spring" ? styles.isSpring : styles.isNotSpring
              }`}
              onClick={() => handleSeason("spring")}
            >
              <i
                className="fa-solid fa-seedling"
                onClick={() => handleSeason("spring")}
              />
            </span>
          </div>
          {/* <input
            className={styles.input}
            type="text"
            name="season"
            placeholder="Write the season of the Activity"
            value={activityData.season}
            onChange={handleChange}
          /> */}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="countries" className={styles.label}>
            Add to Countries
          </label>
          <input
            className={styles.input}
            type="text"
            name="countries"
            placeholder="Write the countries to add this activity to"
            value={activityData.countries}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
