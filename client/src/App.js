import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Detail from "./views/Detail";
import Form from "./views/Form";
import Nav from "./components/Nav";
import "./App.css";

const App = () => {
  const location = useLocation();
  const [countries, setCountries] = useState([]);
  const [maxPages, setMaxPages] = useState(25);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    (async () => {
      const request = await axios.get(
        `http://localhost:3001/countries?name=${inputValue}`
      );
      setMaxPages(Math.ceil(request.data.length / 10));

      const { data } = await axios.get(
        `http://localhost:3001/countries?name=${inputValue}&page=${page}`
      );
      setCountries(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={location.pathname === "/" ? "loginApp" : "App"}>
      {location.pathname !== "/" && (
        <Nav
          setCountries={setCountries}
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          setMaxPages={setMaxPages}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <Home
              countries={countries}
              page={page}
              setPage={setPage}
              maxPages={maxPages}
            />
          }
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/activity" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
