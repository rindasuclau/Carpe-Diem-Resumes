import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./Header.module.css";
const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <header className={classes.header}>
      <nav>
        <h1>Carpe Diem Resumes</h1>
        <ul>
          <li>
            {!isLoggedIn && (
              <NavLink activeClassName={classes.active} to="/login">
                Login
              </NavLink>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <NavLink
                onClick={logoutHandler}
                activeClassName={classes.active}
                to="/"
              >
                Logout
              </NavLink>
            )}
          </li>
          <li>
            {
              <NavLink activeClassName={classes.active} to="/new-resume">
                New Resume
              </NavLink>
            }
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
