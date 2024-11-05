import Router from "./routes/Routes";
import "./App.css";
import { createContext, useContext, useEffect, useReducer } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { getInfo } from "./service/voice";
import { useLocalStorage } from "./hooks/useStorage";
const queryClient = new QueryClient();
export const coursesContext = createContext({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: {},
  });
  const [user] = useLocalStorage("user", {});
  useEffect(() => {
    let user = localStorage.getItem("user");
    let accessToken = localStorage.getItem("access_token");
    console.log("AAA user", user);
    console.log("AAA accessToken", accessToken);
    if (user && accessToken) {
      (async () => {
        let infor = await getInfo({ user_id: JSON.parse(user).phone });
        if (infor.code == 0) {
          console.log("AAAA USER====", { ...JSON.parse(user), ...infor.data });
          dispatch({
            type: "LOGIN",
            payload: {
              ...state,
              user: { ...JSON.parse(user), ...infor.data },
            },
          });
        }
      })();
    }
  }, [user]);
  console.log("AAAA state ====", state);
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
