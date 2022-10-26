import { Route, Routes } from "react-router-dom";

import Home from "./routes/home/home.component";
import PokemonPage from "./components/PokemonPage/pokemon-page.component";

import "./App.scss";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonPage />} />
    </Routes>
  );
};

export default App;
