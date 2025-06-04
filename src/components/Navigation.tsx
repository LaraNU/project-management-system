import { Button, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import logo from '../assets/logo.svg';

export const Navigation = () => {
  const location = useLocation();

  const selectedKey = location.pathname.startsWith('/issues')
    ? 'issues'
    : location.pathname.startsWith('/boards')
      ? 'boards'
      : '';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/boards">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <Menu mode="horizontal" selectedKeys={[selectedKey]} className={styles.menu}>
            <Menu.Item key="issues">
              <Link to="/issues">Все задачи</Link>
            </Menu.Item>
            <Menu.Item key="boards" extra>
              <Link to="/boards">Проекты</Link>
            </Menu.Item>
          </Menu>
        </nav>
      </div>
      <Button type="primary" style={{ fontSize: 'inherit' }}>
        Создать задачу
      </Button>
    </header>
  );
};
