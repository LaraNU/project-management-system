import { observer } from 'mobx-react-lite';
import { Modal, Button, Spin } from 'antd';
import { taskStore } from '../../stores/TaskStore';

type TaskModalProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export const TaskModal = observer(({ open, onOk, onCancel }: TaskModalProps) => {
  const { selectedTask, loadingSelected } = taskStore;

  return (
    <Modal
      title={selectedTask ? 'Редактирование задачи' : 'Создание задачи'}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Перейти на доску
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          Создать/Обновить
        </Button>,
      ]}
    >
      {loadingSelected ? (
        <Spin />
      ) : selectedTask ? (
        <>
          <h3>{selectedTask.title}</h3>
          {selectedTask.description && (
            <p>
              <strong>Описание:</strong> {selectedTask.description}
            </p>
          )}
        </>
      ) : (
        <p>Нет данных для отображения</p>
      )}
    </Modal>
  );
});
