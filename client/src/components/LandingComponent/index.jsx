import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import validate from "../../resources/functions/accessValidate";
import { setEmail, setAccess, setCountries } from "../../redux/actions";
import styles from "./LandingComponent.module.css";

const LandingComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    isRegister: false,
    email: {
      data: "",
      error: "",
    },
    password: {
      data: "",
      error: "",
    },
    confirmPassword: {
      data: "",
      error: "",
    },
    visiblePassword: {
      password: false,
      confirmPassword: false,
    },
  });

  const register = async ({ email, password }) => {
    try {
      await axios.post("http://localhost:3001/users/", {
        email,
        password,
      });
      dispatch(setEmail(email));
      dispatch(setAccess(true));
      dispatch(setCountries("", email));
      navigate("/home");
    } catch (error) {
      alert(error.response.data.error);
      console.error(error);
    }
  };
  const login = async ({ email, password }) => {
    try {
      await axios.get(
        `http://localhost:3001/users/login/?email=${email}&password=${password}`
      );
      dispatch(setEmail(email));
      dispatch(setAccess(true));
      dispatch(setCountries("", email));
      navigate("/home");
    } catch (error) {
      alert(error.response.data.error);
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      ...validate({
        oldData: userData,
        input: { [name]: value },
        password: userData.password.data,
        isRegister: userData.isRegister,
      }),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errorHandler = validate({
      oldData: userData,
      input: {
        email: userData.email.data,
        password: userData.password.data,
        confirmPassword: userData.confirmPassword.data,
      },
      password: userData.password.data,
      isRegister: userData.isRegister,
    });
    setUserData(errorHandler);

    const errorsArray = Object.values(errorHandler).filter((value, index) => {
      if (index === 0) return false;
      return !!value.error;
    });
    if (errorsArray.length)
      return alert("Errors found, please fix them and try again!");

    userData.isRegister
      ? register({
          email: userData.email.data,
          password: userData.password.data,
        })
      : login({ email: userData.email.data, password: userData.password.data });
  };

  const handleVisibility = (type) => {
    if (type === "password") {
      setUserData({
        ...userData,
        visiblePassword: {
          ...userData.visiblePassword,
          password: !userData.visiblePassword.password,
        },
      });
    } else {
      setUserData({
        ...userData,
        visiblePassword: {
          ...userData.visiblePassword,
          confirmPassword: !userData.visiblePassword.confirmPassword,
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={styles.accessContainer}
    >
      <div className={styles.headerImage}>
        {userData.isRegister ? (
          <i className="fa-regular fa-circle-user" />
        ) : (
          <i className="fa-solid fa-circle-user" />
        )}
      </div>
      <div className={styles.inputContainer}>
        <span className={styles.logoContainer}>
          <i className="fa-solid fa-user" />
        </span>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={userData.email.data}
          className={styles.input}
          onChange={handleChange}
          autoComplete="off"
        />
        <span
          className={styles.clearInput}
          onClick={() =>
            setUserData({ ...userData, email: { ...userData.email, data: "" } })
          }
        >
          <i className="fa-regular fa-circle-xmark" />
        </span>
        {userData.email.error?.length ? (
          <span className={styles.warning}>
            <i className="fa-solid fa-circle-exclamation" />
            <span className={styles.bubble}>{userData.email.error}</span>
            <span className={styles.pointer} />
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.inputContainer}>
        <span className={styles.logoContainer}>
          <i className="fa-solid fa-lock" />
        </span>
        <input
          type={userData.visiblePassword.password ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={userData.password.data}
          className={styles.inputPassword}
          onChange={handleChange}
          autoComplete="off"
        />
        <span
          className={styles.clearInputPassword}
          onClick={() =>
            setUserData({
              ...userData,
              password: { ...userData.password, data: "" },
            })
          }
        >
          <i className="fa-regular fa-circle-xmark" />
        </span>
        <span
          className={styles.visiblePassword}
          onClick={() => handleVisibility("password")}
        >
          <i
            className={
              userData.visiblePassword.password
                ? "fa-regular fa-eye"
                : "fa-regular fa-eye-slash"
            }
            onClick={() => handleVisibility("password")}
          />
        </span>
        {userData.password.error?.length ? (
          <span className={styles.warning}>
            <i className="fa-solid fa-circle-exclamation" />
            <span className={styles.bubble}>{userData.password.error}</span>
            <span className={styles.pointer} />
          </span>
        ) : (
          <></>
        )}
      </div>
      {userData.isRegister && (
        <div className={styles.inputContainer}>
          <span className={styles.logoContainer}>
            <i className="fa-solid fa-lock" />
          </span>
          <input
            type={
              userData.visiblePassword.confirmPassword ? "text" : "password"
            }
            name="confirmPassword"
            placeholder="Confirm your password"
            value={userData.confirmPassword.data}
            className={styles.inputPassword}
            onChange={handleChange}
            autoComplete="off"
          />
          <span
            className={styles.clearInputPassword}
            onClick={() =>
              setUserData({
                ...userData,
                confirmPassword: { ...userData.confirmPassword, data: "" },
              })
            }
          >
            <i className="fa-regular fa-circle-xmark" />
          </span>
          <span
            className={styles.visiblePassword}
            onClick={() => handleVisibility("confirmPassword")}
          >
            <i
              className={
                userData.visiblePassword.confirmPassword
                  ? "fa-regular fa-eye"
                  : "fa-regular fa-eye-slash"
              }
              onClick={() => handleVisibility("confirmPassword")}
            />
          </span>
          {userData.confirmPassword.error?.length ? (
            <span className={styles.warning}>
              <i className="fa-solid fa-circle-exclamation" />
              <span className={styles.bubble}>
                {userData.confirmPassword.error}
              </span>
              <span className={styles.pointer} />
            </span>
          ) : (
            <></>
          )}
        </div>
      )}
      <div className={styles.changeFormContainer}>
        <p className={styles.changeFormText}>
          {userData.isRegister
            ? "Already have an account? "
            : "New to Nation-Tales? "}
        </p>
        <span
          className={styles.changeFormLink}
          onClick={() =>
            setUserData({ ...userData, isRegister: !userData.isRegister })
          }
        >
          {userData.isRegister ? "Login" : "Create an Account"}
        </span>
      </div>
      <div className={styles.submitSection}>
        <button type="submit" className={styles.submit}>
          {userData.isRegister ? "REGISTER" : "LOGIN"}
        </button>
        <p className={styles.orText}>Or</p>
        <button
          type="submit"
          name="guest"
          className={styles.submit}
          onClick={() => {
            dispatch(setCountries(""));
            navigate("/home");
          }}
        >
          LOGIN AS GUEST
        </button>
      </div>
    </form>
  );
};

export default LandingComponent;
