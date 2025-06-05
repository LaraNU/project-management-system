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

  const showModal = (id: number) => {
    taskStore.fetchTaskById(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    taskStore.clearSelectedTask();
  };

  const handleOk = () => {
    setModalOpen(false);
    taskStore.clearSelectedTask();
  };

  return (
    <div>
      <h2>Все задачи</h2>
      <div className={styles.container}>
        {taskStore.loading ? (
          <Spin size="large" />
        ) : (
          <ul className={styles.list}>
            {taskStore.tasks.map((task: Task) => (
              <li
                key={task.id}
                className={styles.taskItem}
                onClick={() => showModal(task.id)}
                role="button"
              >
                {task.id}. {task.title}
              </li>
            ))}
          </ul>
        )}

        <Divider />
        <Button type="default" size="large">
          Создать задачу
        </Button>
      </div>

      <TaskModal open={modalOpen} onOk={handleOk} onCancel={closeModal} />
    </div>
  );
});
