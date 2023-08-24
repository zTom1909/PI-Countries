import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Detail from "./views/Detail";
import Form from "./views/Form";
import Nav from "./components/Nav";
import "./App.css";

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/activity" element={<Form />} />
      </Routes>
    </>
  );
};

export default App;
