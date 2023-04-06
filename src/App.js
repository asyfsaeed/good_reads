import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserStore from './store/userStorage';
import routes from "./routes/Routes.jsx";

function App() {
  return (
    <div className="appContainer">
        <UserStore>
          <Routes>
              {
                routes.map((route, index) => {
                  return <Route key={index}
                  path={route.path}
                  element={<route.component name={route.name} {...route.props} />}>
                  </Route>
                })
              }
          </Routes>
        </UserStore>
    </div>

  );
}

export default App;
