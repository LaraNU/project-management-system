import { Select, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { boardStore } from '../../stores/BoardStore';
import { userStore } from '../../stores/UserStore';
import styles from './TaskFilters.module.css';

const { Option } = Select;
const { Search } = Input;

type Props = {
  searchTitle: string;
  onSearch: (value: string) => void;
  statusFilter: string | null;
  onStatusChange: (value: string | null) => void;
  boardFilter: number | null;
  onBoardChange: (value: number | null) => void;
  assigneeFilter: number | null;
  onAssigneeChange: (value: number | null) => void;
};

export const TaskFilters = observer(
  ({
    searchTitle,
    onSearch,
    statusFilter,
    onStatusChange,
    boardFilter,
    onBoardChange,
    assigneeFilter,
    onAssigneeChange,
  }: Props) => {
    return (
      <div className={styles.filters}>
        <Search
          placeholder="Поиск по названию"
          allowClear
          value={searchTitle}
          onChange={(e) => onSearch(e.target.value)}
          className={styles.search}
        />
        <div className={styles.selectFilters}>
          <Select
            placeholder="Статус"
            allowClear
            style={{ width: 160 }}
            onChange={(value) => onStatusChange(value || null)}
            value={statusFilter || undefined}
          >
            <Option value="Backlog">Backlog</Option>
            <Option value="InProgress">InProgress</Option>
            <Option value="Done">Done</Option>
          </Select>

          <Select
            placeholder="Доска"
            allowClear
            style={{ width: 200 }}
            onChange={(value) => onBoardChange(value || null)}
            loading={boardStore.loading}
            value={boardFilter || undefined}
          >
            {boardStore.boards.map((board) => (
              <Option key={board.id} value={board.id}>
                {board.name}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Исполнитель"
            allowClear
            style={{ width: 200 }}
            onChange={(value) => onAssigneeChange(value || null)}
            loading={userStore.loading}
            value={assigneeFilter || undefined}
          >
            {userStore.users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.fullName}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    );
  },
);
