import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountries } from "./redux/actions";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Detail from "./views/Detail";
import Form from "./views/Form";
import Nav from "./components/Nav";
import "./App.css";

const App = () => {
  const email = useSelector((state) => state.email)
  const dispatch = useDispatch();
  const location = useLocation();
  const [aux, setAux] = useState(false);

  useEffect(() => {
    dispatch(setCountries("", email));
  }, [dispatch, email]);

  return (
    <div className={location.pathname === "/" ? "loginApp" : "App"}>
      {location.pathname !== "/" && <Nav aux={aux} setAux={setAux} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home aux={aux} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/activity" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
