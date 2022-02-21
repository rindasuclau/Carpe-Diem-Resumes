import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import Header from "./components/layout/Header";
import ResumeBuilder from "./components/resumes/resume-builder/ResumeBuilder";
import { authActions } from "./store/auth-slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    let timer;

    const startTime = new Date().getTime();
    let endTime;

    if (token) {
      dispatch(
        authActions.autoLogin({
          token: token,
          expiresIn: expiresIn,
        })
      );
      timer = setTimeout(() => {
        dispatch(authActions.logout());
      }, +expiresIn * 1000);
    }

    return () => {
      endTime = new Date().getTime();
      console.log(endTime - startTime);
      clearTimeout(timer);
    };
  }, [dispatch]);
  return (
    <Fragment>
      <Header />
      <Route path="/login">
        <AuthForm />
      </Route>
      <Route path="/new-resume">
        <ResumeBuilder />
      </Route>
    </Fragment>
  );
}

export default App;
