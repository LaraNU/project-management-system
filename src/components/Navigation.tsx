import { Button, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation, type Location } from 'react-router-dom';
import styles from './Navigation.module.css';
import logo from '../assets/logo.svg';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to="/issues">Все задачи</Link>,
    key: 'issues',
  },
  {
    label: <Link to="/boards">Проекты</Link>,
    key: 'boards',
  },
];

export const Navigation = () => {
  const location: Location = useLocation();

  const getSelectedKey = (): string => {
    const { pathname } = location;

    if (pathname.startsWith('/issues')) return 'issues';
    if (pathname.startsWith('/boards')) return 'boards';

    return '';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/boards">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <Menu
            mode="horizontal"
            selectedKeys={[getSelectedKey()]}
            items={items}
            className={styles.menu}
          />
        </nav>
      </div>
      <Button type="primary" style={{ fontSize: 'inherit' }}>
        Создать задачу
      </Button>
    </header>
  );
};
