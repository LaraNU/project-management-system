import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { taskStore } from '../../stores/TaskStore';
import { TaskModal } from '../TaskModal/TaskModal';
import { Button, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation, type Location } from 'react-router-dom';
import styles from './Navigation.module.css';
import logo from '../../assets/logo.svg';

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

export const Navigation = observer(() => {
  const location: Location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    taskStore.fetchTasks();
  }, []);

  const showCreateModal = () => {
    taskStore.clearSelectedTask();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    taskStore.clearSelectedTask();
  };

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
      <Button type="primary" size="large" onClick={showCreateModal}>
        Создать задачу
      </Button>

      <TaskModal open={modalOpen} onClose={closeModal} />
    </header>
  );
});
