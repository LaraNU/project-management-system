import styles from './BoardsPage.module.css';
import { Link } from 'react-router-dom';

export const BoardsPage = () => {
  return (
    <div className={styles.container}>
      <h1>Boards Page</h1>
      <Link to="/boards/1">Проект 1</Link>
    </div>
  );
};
