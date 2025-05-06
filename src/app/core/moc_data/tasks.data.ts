import { Task } from '../models/task.model';
import { TaskStatus } from '../models/status.enum';

export const TASKS: Task[] = [
  {
    id: 1,
    title: 'Встановити Angular',
    description: 'Встановити останню версію Angular та налаштувати проєкт.',
    assignee: 'Ярослав',
    dueDate: new Date('2025-02-14'), 
    status: TaskStatus.DONE
  },
  {
    id: 2,
    title: 'Ознайомитися з компонентами',
    description: 'Вивчити основи створення компонентів у Angular.',
    assignee: 'Олег',
    dueDate: new Date('2025-02-15'), 
    status: TaskStatus.IN_PROGRESS
  }
];