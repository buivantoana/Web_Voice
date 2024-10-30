import Router from "./routes/Routes";
import "./App.css";
import { createContext, useContext, useReducer } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
const queryClient = new QueryClient();
export const coursesContext = createContext({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
      };
    case "PROGRESS":
      return {
        ...state,
        progress: action.payload.progress,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
        progress: undefined,
      };
    default:
      return state;
  }
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: {},
    progress: undefined,
  });

  console.log(state);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <coursesContext.Provider value={{ dispatch, state }}>
            <Router />
          </coursesContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
};
export const useCoursesContext = () => useContext(coursesContext);
export default App;
