import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import ArticlesList from "./Components/ArticlesList";
import Home from "./Components/Home";
import Navigator from "./Components/Navigator";
import Login from "./Components/Login";
import Topic from "./Components/Topic";
import SingleArticle from "./Components/SingleArticle";
import { UserLoginProvider } from "./Contexts/UserLogin";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const location = useLocation();

  return (
    <>
      <UserLoginProvider>
        {location.pathname !== "/log-in" && <Header></Header>}
        {location.pathname !== "/log-in" && <Navigator></Navigator>}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/articles" element={<ArticlesList />}></Route>
          <Route path="/log-in" element={<Login />}></Route>
          <Route
            path="/articles/:article_id"
            element={<SingleArticle />}
          ></Route>
          <Route path="/coding" element={<Topic topic="coding" />}></Route>
          <Route path="/cooking" element={<Topic topic="cooking" />}></Route>
          <Route path="/football" element={<Topic topic="football" />}></Route>
          {/* for non-existent path */}
          <Route
            path="*"
            element={<ErrorPage errorMessage="page not found" />}
          ></Route>
        </Routes>
      </UserLoginProvider>
    </>
  );
}

export default App;
