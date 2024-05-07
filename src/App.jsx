import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import ArticlesList from "./Components/ArticlesList";
import Home from "./Components/Home";
import Navigator from "./Components/Navigator";
import Login from "./Components/Login";
import { useState } from "react";

function App() {
  const [onLogin, setOnLogin] = useState(false);
  const [appLogin, setAppLoggedin] = useState(false);
  return (
    <>
      {!onLogin && <Header></Header>}
      {!onLogin && <Navigator></Navigator>}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<ArticlesList />}></Route>
        <Route
          path="/log-in"
          element={
            <Login setOnLogin={setOnLogin} setAppLoggedin={setAppLoggedin} />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
