import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import foodReducer from "./store/reducers/Food";
// import categoriesReducer from './store/reducers/Categories'
import App from "./App";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { theme } from "Definitions/Styled";
import "./index.css";

// const composeEnhancers =
//   process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;
// it could be your App.tsx file or theme file that is included in your tsconfig.json

const rootReducer = combineReducers({
  FoodReducer: foodReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    {/* <StyledEngineProvider injectFirst> */}
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
    {/* </StyledEngineProvider> */}
  </Provider>,
  document.getElementById("root")
);
