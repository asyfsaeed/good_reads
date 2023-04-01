import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/Routes";

function App() {
  return (
    <div className="appContainer">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>

  );
}

export default App;
