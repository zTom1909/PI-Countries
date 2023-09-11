import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar";
import { filterCountries, orderCountries, setAccess } from "../../redux/actions";
import styles from "./Nav.module.css";

const Nav = ({ setAux, aux }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isPressed, setIsPressed] = useState({
    order: false,
    filter: false,
  });

  const [continentFilter, setContinentFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState({
    difficulty: 0,
  });

  const handleLogout = () => {
    dispatch(setAccess(false))
    navigate("/")
  }
  
  const handleDispatch = (action, payload) => {
    dispatch(action(payload));
    setAux(!aux);
  };

  const handleOrder = (type, order) =>
    handleDispatch(orderCountries, {
      orderType: type,
      sortOrder: order,
    });

  const handleActivityFilter = ({ difficulty, season }) => {
    if (season === activityFilter.season) season = "";
    if (difficulty === activityFilter.difficulty) difficulty = 0;

    difficulty ??= activityFilter.difficulty;
    season ??= activityFilter.season;

    setActivityFilter({ difficulty, season });

    return handleDispatch(filterCountries, {
      filterType: "activity",
      filterInfo: { difficulty, season },
    });
  };

  const handleContinentFilter = (continent) => {
    if (continentFilter === continent) continent = "";
    setContinentFilter(continent);

    return handleDispatch(filterCountries, {
      filterType: "continent",
      filterInfo: continent,
    });
  };

  return (
    <div className={styles.navContainer}>
      <button
        className={`${styles.button} ${styles.back}`}
        onClick={handleLogout}
      >
        <i className="fa-solid fa-reply" />
      </button>
      <h1 className={styles.title}>NATION-TALES</h1>
      <SearchBar />
      {location.pathname !== "/activity" && (
        <button
          className={`${styles.button} ${styles.activity}`}
          onClick={() => navigate("/activity")}
        >
          <i className="fa-solid fa-circle-plus" /> Activity
        </button>
      )}
      <div className={styles.order}>
        <button
          className={`${styles.orderButton} ${
            isPressed.order && styles.buttonPressed
          }`}
          onClick={() => setIsPressed({ order: !isPressed.order })}
        >
          Order Byㅤ
          {isPressed.order ? (
            <i className="fa-solid fa-caret-up" />
          ) : (
            <i className="fa-solid fa-caret-down" />
          )}
        </button>
        <div className={isPressed.order ? styles.options : styles.invisible}>
          <button
            className={styles.option}
            onClick={() => handleOrder("name", "A")}
          >
            <i className="fa-solid fa-arrow-down-a-z" /> Name
          </button>
          <button
            className={styles.option}
            onClick={() => handleOrder("name", "D")}
          >
            <i className="fa-solid fa-arrow-down-z-a" /> Name
          </button>
          <button
            className={styles.option}
            onClick={() => handleOrder("population", "A")}
          >
            <i className="fa-solid fa-arrow-down-short-wide" /> Population
          </button>
          <button
            className={`${styles.option} ${styles.lastOptionFilter}`}
            onClick={() => handleOrder("population", "D")}
          >
            <i className="fa-solid fa-arrow-down-wide-short" /> Population
          </button>
        </div>
      </div>
      <div className={styles.filter}>
        <button
          className={`${styles.filterButton} ${
            isPressed.filter && styles.buttonPressed
          }`}
          onClick={() =>
            setIsPressed({
              filter: !isPressed.filter,
              continentFilter: false,
              activitiesFilter: false,
            })
          }
        >
          Filter Byㅤ
          {isPressed.filter ? (
            <i className="fa-solid fa-caret-up" />
          ) : (
            <i className="fa-solid fa-caret-down" />
          )}
        </button>
        <div
          className={
            isPressed.filter
              ? `${styles.options} ${
                  (isPressed.continentFilter || isPressed.activitiesFilter) &&
                  styles.optionsWithSubmenu
                }`
              : styles.invisible
          }
        >
          <button
            className={styles.option}
            onClick={() =>
              setIsPressed({
                ...isPressed,
                continentFilter: !isPressed.continentFilter,
                activitiesFilter: false,
              })
            }
          >
            <i className="fa-solid fa-globe" /> Continent
          </button>
          <div
            className={
              isPressed.filter && isPressed.continentFilter
                ? styles.filterOptions
                : styles.invisible
            }
          >
            <button
              className={`${styles.continentOption} ${styles.option1}`}
              onClick={() => handleContinentFilter("North America")}
            >
              <i className="fa-solid fa-earth-americas" /> North America
            </button>
            <button
              className={styles.continentOption}
              onClick={() => handleContinentFilter("South America")}
            >
              <i className="fa-solid fa-earth-americas" /> South America
            </button>
            <button
              className={styles.continentOption}
              onClick={() => handleContinentFilter("Europe")}
            >
              <i className="fa-solid fa-earth-europe" /> Europe
            </button>
            <button
              className={styles.continentOption}
              onClick={() => handleContinentFilter("Asia")}
            >
              <i className="fa-solid fa-earth-asia" /> Asia
            </button>
            <button
              className={styles.continentOption}
              onClick={() => handleContinentFilter("Africa")}
            >
              <i className="fa-solid fa-earth-africa" /> Africa
            </button>
            <button
              className={`${styles.continentOption} ${styles.lastOptionFilter}`}
              onClick={() => handleContinentFilter("Oceania")}
            >
              <i className="fa-solid fa-earth-oceania" /> Oceania
            </button>
          </div>
          <button
            className={`${styles.option} ${
              isPressed.activitiesFilter
                ? styles.lastOption
                : styles.lastOptionFilter
            }`}
            onClick={() =>
              setIsPressed({
                ...isPressed,
                continentFilter: false,
                activitiesFilter: !isPressed.activitiesFilter,
              })
            }
          >
            <i className="fa-regular fa-pen-to-square" /> Activities
          </button>
          <div
            className={
              isPressed.filter && isPressed.activitiesFilter
                ? styles.filterOptions2
                : styles.invisible
            }
          >
            <button
              className={`${styles.option} ${styles.option1} ${styles.activityFilter}`}
            >
              <i className="fa-solid fa-star" />
              Difficulty
              <div className={styles.filterContainer}>
                <button
                  className={styles.difficultyStar}
                  onClick={() => handleActivityFilter({ difficulty: 1 })}
                >
                  {activityFilter.difficulty >= 1 ? (
                    <i
                      className="fa-solid fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 1 })}
                    />
                  ) : (
                    <i
                      className="fa-regular fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 1 })}
                    />
                  )}
                </button>
                <button
                  className={styles.difficultyStar}
                  onClick={() => handleActivityFilter({ difficulty: 2 })}
                >
                  {activityFilter.difficulty >= 2 ? (
                    <i
                      className="fa-solid fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 2 })}
                    />
                  ) : (
                    <i
                      className="fa-regular fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 2 })}
                    />
                  )}
                </button>
                <button
                  className={styles.difficultyStar}
                  onClick={() => handleActivityFilter({ difficulty: 3 })}
                >
                  {activityFilter.difficulty >= 3 ? (
                    <i
                      className="fa-solid fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 3 })}
                    />
                  ) : (
                    <i
                      className="fa-regular fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 3 })}
                    />
                  )}
                </button>
                <button
                  className={styles.difficultyStar}
                  onClick={() => handleActivityFilter({ difficulty: 4 })}
                >
                  {activityFilter.difficulty >= 4 ? (
                    <i
                      className="fa-solid fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 4 })}
                    />
                  ) : (
                    <i
                      className="fa-regular fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 4 })}
                    />
                  )}
                </button>
                <button
                  className={styles.difficultyStar}
                  onClick={() => handleActivityFilter({ difficulty: 5 })}
                >
                  {activityFilter.difficulty >= 5 ? (
                    <i
                      className="fa-solid fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 5 })}
                    />
                  ) : (
                    <i
                      className="fa-regular fa-star"
                      onClick={() => handleActivityFilter({ difficulty: 5 })}
                    />
                  )}
                </button>
              </div>
            </button>
            <button
              className={`${styles.option} ${styles.lastOptionFilter} ${styles.activityFilter}`}
            >
              <i className="fa-solid fa-leaf" /> Season
              <div className={styles.filterContainer}>
                <button
                  className={`${styles.season} ${
                    activityFilter.season === "Verano"
                      ? styles.isSummer
                      : styles.isNotSummer
                  }`}
                  onClick={() => handleActivityFilter({ season: "Verano" })}
                >
                  <i
                    className="fa-solid fa-sun"
                    onClick={() => handleActivityFilter({ season: "Verano" })}
                  />
                </button>
                <button
                  className={`${styles.season} ${
                    activityFilter.season === "Otoño"
                      ? styles.isAutumn
                      : styles.isNotAutumn
                  }`}
                  onClick={() => handleActivityFilter({ season: "Otoño" })}
                >
                  <i
                    className="fa-brands fa-canadian-maple-leaf"
                    onClick={() => handleActivityFilter({ season: "Otoño" })}
                  />
                </button>
                <button
                  className={`${styles.season} ${
                    activityFilter.season === "Invierno"
                      ? styles.isWinter
                      : styles.isNotWinter
                  }`}
                  onClick={() => handleActivityFilter({ season: "Invierno" })}
                >
                  <i
                    className="fa-regular fa-snowflake"
                    onClick={() => handleActivityFilter({ season: "Invierno" })}
                  />
                </button>
                <button
                  className={`${styles.season} ${
                    activityFilter.season === "Primavera"
                      ? styles.isSpring
                      : styles.isNotSpring
                  }`}
                  onClick={() => handleActivityFilter({ season: "Primavera" })}
                >
                  <i
                    className="fa-solid fa-seedling"
                    onClick={() =>
                      handleActivityFilter({ season: "Primavera" })
                    }
                  />
                </button>
              </div>
            </button>
          </div>
        </div>
      </div>
      <button
        className={`${styles.button} ${styles.home}`}
        onClick={() => navigate("/home")}
      >
        <i className="fa-solid fa-house" />
      </button>
    </div>
  );
};

export default Nav;
