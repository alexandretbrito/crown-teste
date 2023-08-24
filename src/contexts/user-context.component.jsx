import { createContext, useEffect, useReducer } from "react";
import { userAuthStateChangeListener, createUserDocFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const USER_CURRENT_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  console.log('dispatched');
  console.log(action);

  const { type, payload } = action;

  switch (type) {
    case USER_CURRENT_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled error type with ${type} in userReducer`);
  }
 
}

const INITIAL_STATE ={
  currentUser: null
}

export const UserProvider = ({ children }) => {

  const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch({type: USER_CURRENT_TYPES.SET_CURRENT_USER, payload: user});
  }
  
  useEffect(() => {
    const unsubscribe = userAuthStateChangeListener((user) => {
      if(user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    })
    return unsubscribe;
  }, []);
  
  const value = { currentUser, setCurrentUser };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
