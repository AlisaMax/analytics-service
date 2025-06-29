import { NavLink } from 'react-router-dom';
import styles from './HeaderMenu.module.css';
import icons from '../../assets/icons/icons';

const HeaderMenu = () => {
  return (
    <div className={styles.HeaderMenu} data-testid="navigation">
      <NavLink
        className={({ isActive }) => `${styles.MenuLink} ${isActive ? styles.active : ''}`}
        to="/"
        data-testid="analytic-link"
      >
        <span>
          <img src={icons.analytic} />
          CSV Аналитик
        </span>
      </NavLink>

      <NavLink
        className={({ isActive }) => `${styles.MenuLink} ${isActive ? styles.active : ''}`}
        to="/generator"
        data-testid="generate-link"
      >
        <span>
          <img src={icons.generate} />
          CSV Генератор
        </span>
      </NavLink>

      <NavLink
        className={({ isActive }) => `${styles.MenuLink} ${isActive ? styles.active : ''}`}
        to="/history"
        data-testid="history-link"
      >
        <span>
          <img src={icons.history} />
          История
        </span>
      </NavLink>
    </div>
  );
};

export default HeaderMenu;
