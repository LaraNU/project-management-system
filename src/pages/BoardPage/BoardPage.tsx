import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { boardStore } from '../../stores/BoardStore';
import { Card, Col, Row, Spin, Typography } from 'antd';
import styles from './BoardPage.module.css';
import { TaskModal } from '../../components/TaskModal/TaskModal';
import { taskStore } from '../../stores/TaskStore';

const { Title } = Typography;

const statuses = ['Backlog', 'InProgress', 'Done'];

export const BoardPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (boardId) {
      boardStore.fetchBoardById(boardId);
    }
  }, [boardId]);

  const openTask = (taskId: number) => {
    taskStore.fetchTaskById(taskId);
    setModalOpen(true);
  };

  const closeModal = () => {
    taskStore.clearSelectedTask();
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.boardsContainer}>
        <h2 className={styles.title}>Доска задач</h2>

        {boardStore.loadingSelected ? (
          <Spin size="large" />
        ) : (
          <Row gutter={16}>
            {statuses.map((status) => (
              <Col span={8} key={status}>
                <Title level={4}>{status}</Title>
                <div className={styles.column}>
                  {boardStore.selectedBoard
                    .filter((t) => t.status === status)
                    .map((task) => (
                      <Card
                        key={task.id}
                        title={task.title}
                        hoverable
                        onClick={() => openTask(task.id)}
                        className={styles.card}
                      >
                        <p>{task.description}</p>
                      </Card>
                    ))}
                </div>
              </Col>
            ))}
          </Row>
        )}

        <TaskModal open={modalOpen} onClose={closeModal} boardId={boardId} />
      </div>
    </div>
  );
});
