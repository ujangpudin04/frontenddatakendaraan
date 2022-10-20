import "./App.css";
import { Route, Routes } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { UserContext } from "./context/context";
import Home from "./components/pages/Home";
import Update from "./components/pages/Update";
import Create from "./components/pages/Create";
import Detail from "./components/pages/Detail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/detail/:id" exact element={<Detail />} />
        <Route path="/create" exact element={<Create />} />
        <Route path="/update/:id" exact element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
