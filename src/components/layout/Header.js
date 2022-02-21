import { NavLink, Router } from "react-router-dom";
import classes from './Header.module.css';
const Header = () => {
  return (
    <header className={classes.header}>
      <nav>
          <h1>Carpe Diem Resumes</h1>
        <ul>
          <li>
            {<NavLink activeClassName={classes.active} to='/login'>Login</NavLink>}
          </li>
          <li>
            {<NavLink activeClassName={classes.active} to='/'>Logout</NavLink>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
