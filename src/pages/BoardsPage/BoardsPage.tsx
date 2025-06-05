import styles from './BoardsPage.module.css';
import { Spin, Divider } from 'antd';
import { observer } from 'mobx-react-lite';
import { boardStore } from '../../stores/BoardStore';
import type { Board } from '../../types';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const BoardsPage = observer(() => {
  const { boards, loading } = boardStore;

  useEffect(() => {
    if (boards.length > 0) return;
    boardStore.fetchBoards();
  });

  return (
    <div className={styles.container}>
      <div className={styles.boardsContainer}>
        <h2 className={styles.title}>All Boards</h2>
        <Divider />
        {loading ? (
          <Spin size="large" />
        ) : (
          <ul className={styles.list}>
            {boards.map((board: Board) => (
              <li key={board.id} className={styles.boardItem}>
                <div className={styles.boardInfo}>
                  <h4 className={styles.boardTitle}>{board.name}</h4>
                  <p className={styles.boardDescription}>{board.description}</p>
                </div>
                <Link to={`/boards/${board.id}`} role="button">
                  Перейти к доске
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});
