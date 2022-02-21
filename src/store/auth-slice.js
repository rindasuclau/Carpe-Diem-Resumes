import { createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../assets/key";

const authInitialState = { isLoggedIn: false, expiresIn: "", token: null };

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, data) {
      if (data && data.payload && data.payload.idToken) {
        state.token = data.idToken;
        state.expiresIn = data.payload.expiresIn;
        state.isLoggedIn = true;
        localStorage.setItem("token", data.payload.idToken);
        localStorage.setItem("expiresIn", data.payload.expiresIn);
      }
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      state.isLoggedIn = false;
      state.token = null;
      state.expiresIn = "";
    },
    autoLogin(state, data) {
      if (data && data.payload) {
        state.isLoggedIn = true;
        state.token = data.payload.token;
        state.expiresIn = data.payload.expiresIn;
      }
    }
  },
});

export const login = (loginData) => {
  console.log(loginData);
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
    API_KEY;
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(authActions.login(data));
      } else {
        throw new Error("Authenticaiton failed!");
      }
    };

    await sendRequest().catch((error) => {
      // log the error and show it on the screen
      console.log(error);
    });
  };
};

export const signUp = (signUpData) => {
  return async (dispatch) => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      API_KEY;
    const sendRequest = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: signUpData.email,
          password: signUpData.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(authActions.login(data));
      } else {
        throw new Error("Sign Up failed!");
      }
    };

    await sendRequest().catch((error) => {
      // log the error and show it on the screen
      console.log(error);
    });
  };
};

export const authActions = authSlice.actions;

export default authSlice;
