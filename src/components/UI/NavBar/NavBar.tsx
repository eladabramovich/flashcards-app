import styles from './NavBar.module.css';

import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.linksList}>
          <li className={styles.item}>
            <NavLink exact to="/" activeClassName={styles.active}>
              Quiz yourself
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to="/manage-cards" activeClassName={styles.active}>
              Manage cards
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
