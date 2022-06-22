import React, { useEffect, useReducer } from "react";

const initialState = {
  isLoggedIn: false,
  sidebar:false,
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
        return {
            ...state,isLoggedIn: true,
        };
        break;
    case "LOG_OUT":
        return {
            ...state,isLoggedIn: false,
        }
        break;
      case "SIDEBAR_TOGGLE":
        return {
            ...state,sidebar: !state.sidebar
        }
        break;
      case "SIDEBAR_OFF":
        return {
            ...state,sidebar: false
        }
        break;
    default:
      return state;
  }
};

export const UC = React.createContext();
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  

  
    const addFav = (property) => {
    if(localStorage.fav) {
      localStorage.setItem('fav',JSON.stringify([...JSON.parse(localStorage.fav),property]))
    } else {
      localStorage.setItem('fav',JSON.stringify([property]))
    }
    console.log(JSON.parse(localStorage.fav))
    }

  return (
    <>
      <UC.Provider
        value={{
          dispatch,addFav,
          fav:state.fav,
          sidebar:state.sidebar
        }}
      >
        {children} 
      </UC.Provider>
    </>
  );
};

export default Provider;
