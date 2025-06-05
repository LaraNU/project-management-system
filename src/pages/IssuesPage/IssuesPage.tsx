import { useEffect, useState, useMemo } from 'react';
import { Button, Spin, Divider } from 'antd';
import { TaskModal } from '../../components/TaskModal/TaskModal';
import { type Task } from '../../types';
import { observer } from 'mobx-react-lite';
import { taskStore } from '../../stores/TaskStore';
import { boardStore } from '../../stores/BoardStore';
import { userStore } from '../../stores/UserStore';
import styles from './IssuesPage.module.css';
import { TaskFilters } from '../../components/TaskFilters/TaskFilters';

export const IssuesPage = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [boardFilter, setBoardFilter] = useState<number | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState<number | null>(null);

  useEffect(() => {
    taskStore.fetchTasks();
    boardStore.fetchBoards();
    userStore.fetchUsers();
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

  const filteredTasks = useMemo(() => {
    return taskStore.tasks.filter((task) => {
      if (searchTitle && !task.title.toLowerCase().includes(searchTitle.toLowerCase())) {
        return false;
      }
      if (statusFilter && task.status !== statusFilter) return false;
      if (boardFilter && task.boardId !== boardFilter) return false;
      if (assigneeFilter && task.assignee.id !== assigneeFilter) return false;
      return true;
    });
  }, [taskStore.tasks, searchTitle, statusFilter, boardFilter, assigneeFilter]);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Все задачи</h2>
        <Divider />

        <TaskFilters
          searchTitle={searchTitle}
          onSearch={setSearchTitle}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          boardFilter={boardFilter}
          onBoardChange={setBoardFilter}
          assigneeFilter={assigneeFilter}
          onAssigneeChange={setAssigneeFilter}
        />

        <Divider />
        {taskStore.loading ? (
          <Spin size="large" />
        ) : (
          <>
            {filteredTasks.length === 0 ? (
              <p className={styles.emptyResults}>
                Ничего не найдено. Попробуйте изменить параметры поиска.
              </p>
            ) : (
              <ul className={styles.list}>
                {filteredTasks.map((task: Task) => (
                  <li
                    key={task.id}
                    className={styles.taskItem}
                    onClick={() => showEditModal(task.id)}
                    role="button"
                  >
                    {task.id}. {task.title}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <Divider />

        <Button type="default" size="large" onClick={showCreateModal}>
          Создать задачу
        </Button>
      </div>

      <TaskModal open={modalOpen} onClose={closeModal} />
    </>
  );
});
