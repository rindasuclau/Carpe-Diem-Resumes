import { Redirect, Route, Router } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import Header from "./components/layout/Header";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/login">
        <AuthForm />
      </Route>
      <Route path="*">
        <Redirect to="/home"/>
      </Route>
    </Router>
  );
}

export default App;
