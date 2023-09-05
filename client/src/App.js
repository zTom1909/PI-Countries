import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addCountries } from "./redux/actions";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Detail from "./views/Detail";
import Form from "./views/Form";
import Nav from "./components/Nav";
import "./App.css";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3001/countries`);
      dispatch(addCountries(data));
    })();
  }, [dispatch]);

  return (
    <div className={location.pathname === "/" ? "loginApp" : "App"}>
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/activity" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
