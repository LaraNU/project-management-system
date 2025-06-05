import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Button, Spin, Form, Input, Select, message } from 'antd';
import { taskStore } from '../../stores/TaskStore';
import { boardStore } from '../../stores/BoardStore';
import { userStore } from '../../stores/UserStore';

const { TextArea } = Input;

type TaskFormValues = {
  title: string;
  description: string;
  boardId: number;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Backlog' | 'InProgress' | 'Done';
  assigneeId: number;
};

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
};

export const TaskModal = observer(({ open, onClose }: TaskModalProps) => {
  const [form] = Form.useForm();
  const { selectedTask, loadingSelected } = taskStore;

  useEffect(() => {
    if (!open) return;

    boardStore.fetchBoards();
    userStore.fetchUsers();

    if (selectedTask) {
      form.setFieldsValue({
        title: selectedTask.title,
        description: selectedTask.description,
        boardName: selectedTask.boardName,
        priority: selectedTask.priority,
        status: selectedTask.status,
        assigneeId: selectedTask.assignee.id,
      });
    } else {
      form.resetFields();
    }
  }, [open, selectedTask, form]);

  const handleFinish = async (values: TaskFormValues) => {
    try {
      if (selectedTask) {
        await taskStore.updateTask(selectedTask.id, {
          title: values.title,
          description: values.description,
          priority: values.priority,
          status: values.status,
          assigneeId: values.assigneeId,
        });

        message.success('Задача успешно обновлена');
      } else {
        await taskStore.createTask({
          title: values.title,
          description: values.description,
          boardId: values.boardId,
          priority: values.priority,
          assigneeId: values.assigneeId,
        });

        message.success('Задача успешно создана');
      }
      onClose();
      taskStore.fetchTasks();
    } catch (err) {
      if (err instanceof Error) message.error(err.message || 'Ошибка при сохранении задачи');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    taskStore.clearSelectedTask();
    onClose();
  };

  return (
    <Modal
      title={selectedTask ? 'Редактирование задачи' : 'Создание задачи'}
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      confirmLoading={taskStore.loadingSelected}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Перейти на доску
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          {selectedTask ? 'Обновить' : 'Создать'}
        </Button>,
      ]}
    >
      {loadingSelected ? (
        <Spin />
      ) : (
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            name={'title'}
            rules={[{ required: true, message: 'Введите название задачи' }]}
          >
            <Input placeholder="Название" />
          </Form.Item>

          <Form.Item name={'description'} rules={[{ required: true, message: 'Введите описание' }]}>
            <TextArea rows={4} placeholder="Описание" />
          </Form.Item>

          {!selectedTask && (
            <Form.Item name="boardId" rules={[{ required: true, message: 'Выберите проект' }]}>
              <Select placeholder="Выберите проект" loading={boardStore.loading}>
                {boardStore.boards.map((board) => (
                  <Select.Option key={board.id} value={board.id}>
                    {board.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item name={'priority'} rules={[{ required: true, message: 'Выберите приоритет' }]}>
            <Select placeholder="Приоритет">
              <Select.Option value="Low">Low</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="High">High</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name={'status'} rules={[{ required: true, message: 'Выберите статус' }]}>
            <Select placeholder="Статус">
              <Select.Option value="Backlog">Backlog</Select.Option>
              <Select.Option value="InProgress">InProgress</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="assigneeId"
            rules={[{ required: true, message: 'Выберите исполнителя' }]}
          >
            <Select placeholder="Выберите исполнителя" loading={userStore.loading}>
              {userStore.users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.fullName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
});
