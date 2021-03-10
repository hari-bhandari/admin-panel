import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../util/setAuthToken';
import {
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR_GET_ME
} from '../types';

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: true,
    user: null,
    error: null,
    loading:true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    const token=localStorage.getItem('token')
    if(token){
      setAuthToken(token)
      try {
        const res = await axios.get('/api/v1/auth/me');
        dispatch({
          type: USER_LOADED,
          payload: res.data.data
        });
      } catch (err) {
        dispatch({ type: AUTH_ERROR_GET_ME });
      }

    }

  };

  // Login User
  const setToken = async (token,remember) => {
    console.log(token,remember)
    if(remember){
      localStorage.setItem('token',token)
    }
    if(token){
      setAuthToken(token)
      try {
        const res = await axios.get('/api/v1/auth/me');

        dispatch({
          type: USER_LOADED,
          payload: res.data.data
        });
      }
     catch (err) {
      dispatch({ type: AUTH_ERROR_GET_ME });
    }


    }
    if(!token){
      dispatch({ type: LOGOUT })
    }
  };


  // Logout
  const logout = () => dispatch({ type: LOGOUT });


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading:state.loading,
        loadUser,
        logout,setToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
