import { useReducer } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import classes from "./AuthForm.module.css";
import { login, signUp } from "../../store/auth-slice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const initialState = {
  email: "",
  password: "",
  emailIsValid: false,
  passwordIsValid: false,
  emailTouched: false,
  passwordTouched: false,
  loginMode: true,
};

const authFormReducer = (state = initialState, action) => {
  if (action && action.type) {
    switch (action.type) {
      case "SET_EMAIL":
        const isEmailValid = state.email.includes("@");
        return {
          ...state,
          email: action.value,
          emailIsValid: isEmailValid,
          emailTouched: true,
        };
      case "SET_PASSWORD":
        const isPasswordValid = state.password.trim().length >= 7;
        return {
          ...state,
          password: action.value,
          passwordIsValid: isPasswordValid,
          passwordTouched: true,
        };
      case "SWITCH":
        return { ...state, loginMode: !state.loginMode };
      default:
        return initialState;
    }
  }

  return initialState;
};

const AuthForm = () => {
  const [authForm, authDispatch] = useReducer(authFormReducer, initialState);

  const isLoggedIn = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const formIsValid = authForm.emailIsValid && authForm.passwordIsValid;

  const emailInputError = !authForm.emailIsValid && authForm.emailTouched;

  const passwordInputError =
    !authForm.passwordIsValid && authForm.passwordTouched;

  const enteredEmailHandler = (event) => {
    authDispatch({ type: "SET_EMAIL", value: event.target.value });
  };

  const enteredPasswordHandler = (event) => {
    authDispatch({ type: "SET_PASSWORD", value: event.target.value });
  };

  const switchHandler = () => {
    authDispatch({ type: "SWITCH" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    if (authForm.loginMode) {
      dispatch(
        login({
          email: authForm.email,
          password: authForm.password,
        })
      );
    } else {
      dispatch(
        signUp({
          email: authForm.email,
          password: authForm.password,
        })
      );
    }

    if (isLoggedIn) {
      history.replace("/new-resume");
    }

    authDispatch();
  };

  const emailInputClasses = `${emailInputError ? classes.invalid : ""}`;
  const passwordInputClasses = `${passwordInputError ? classes.invalid : ""}`;
  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <div className={classes.holder}>
            <label htmlFor="email">E-Mail Address</label>
            <p>
              Need an account?{" "}
              <b onClick={switchHandler}>
                {authForm.loginMode ? "Sign Up" : "Back to Log In"}
              </b>
            </p>
          </div>
          <input
            className={emailInputClasses}
            type="email"
            id="email"
            required
            value={authForm.email}
            onChange={enteredEmailHandler}
            onBlur={enteredEmailHandler}
          />
          {emailInputError && (
            <p className={classes.error}>Looks like you forgot something</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            className={passwordInputClasses}
            type="password"
            id="password"
            minLength="8"
            required
            value={authForm.password}
            onChange={enteredPasswordHandler}
            onBlur={enteredPasswordHandler}
          />
          {passwordInputError && (
            <p className={classes.error}>Password is to short (minimum 8).</p>
          )}
        </div>
        <div className={classes.actions}>
          <button className={classes.button}>
            {authForm.loginMode ? "Log in" : "Sign Up"}
          </button>
        </div>
        <p className={classes["forgot-password"]}>Forgot password?</p>
      </form>
    </div>
  );
};

export default AuthForm;
