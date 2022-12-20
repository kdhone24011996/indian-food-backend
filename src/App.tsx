import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "views/Home";
import { FoodDetails } from "views/FoodDetails";
import { DishSuggestion } from "views/DishSuggestion";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="foods/dish-suggester" element={<DishSuggestion />} />
      <Route path="foods/:id" element={<FoodDetails />} />
    </Routes>
  );
};

export default App;
