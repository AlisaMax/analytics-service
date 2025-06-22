import styles from './Header.module.css';
import Logo from '../../assets/icons/Logo.svg';
import HeaderMenu from '../headerMenu/HeaderMenu';

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.LogoBlock}>
        <img src={Logo} alt="Летние Школы" className={styles.Logo} />
        <h1>Межгалактическая аналитика</h1>
      </div>
      <HeaderMenu />
    </div>
  );
};

export default Header;
