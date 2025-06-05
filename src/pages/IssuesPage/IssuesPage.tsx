import { useEffect, useState } from 'react';
import { Button, Spin, Divider } from 'antd';
import { TaskModal } from '../../components/TaskModal/TaskModal';
import { type Task } from '../../types';
import { observer } from 'mobx-react-lite';
import { taskStore } from '../../stores/TaskStore';
import styles from './IssuesPage.module.css';

export const IssuesPage = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    taskStore.fetchTasks();
  }, []);

  const showCreateModal = () => {
    taskStore.clearSelectedTask();
    setModalOpen(true);
  };

  const showEditModal = (id: number) => {
    taskStore.fetchTaskById(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    taskStore.clearSelectedTask();
  };

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>Все задачи</h2>
        <Divider />
        {taskStore.loading ? (
          <Spin size="large" />
        ) : (
          <ul className={styles.list}>
            {taskStore.tasks.map((task: Task) => (
              <li
                key={task.id}
                className={styles.taskItem}
                onClick={() => showEditModal(task.id)}
                role="button"
              >
                {task.id}. {task.title}
              </li>
            ))}
            <Divider />
          </ul>
        )}

        <Button type="default" size="large" onClick={showCreateModal}>
          Создать задачу
        </Button>
      </div>

      <TaskModal open={modalOpen} onClose={closeModal} />
    </div>
  );
});
