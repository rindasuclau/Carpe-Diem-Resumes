import { useReducer } from "react";
import classes from "./AuthForm.module.css";

const initialState = {
  email: "",
  password: "",
  emailIsValid: false,
  passwordIsValid: false,
  emailTouched: false,
  passwordTouched: false,
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
        const isPasswordValid = state.password.trim().length > 7;
        return {
          ...state,
          password: action.value,
          passwordIsValid: isPasswordValid,
          passwordTouched: true,
        };
      default:
        return initialState;
    }
  }

  return initialState;
};

const AuthForm = () => {
  const [authForm, dispatch] = useReducer(authFormReducer, initialState);

  const formIsValid = authForm.emailIsValid && authForm.passwordIsValid;

  const emailInputError = !authForm.emailIsValid && authForm.emailTouched;

  const passwordInputError =
    !authForm.passwordIsValid && authForm.passwordTouched;


  const enteredEmailHandler = (event) => {
    dispatch({ type: "SET_EMAIL", value: event.target.value });
  };

  const enteredPasswordHandler = (event) => {
    dispatch({ type: "SET_PASSWORD", value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    dispatch();
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
              Need an account? <b>Sign Up</b>{" "}
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
          <button className={classes.button}>Log in</button>
        </div>
        <p className={classes["forgot-password"]}>Forgot password?</p>
      </form>
    </div>
  );
};

export default AuthForm;
