import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../core/models/status.enum';

@Pipe({
  name: 'taskStatus',
  standalone: true,
  pure: false
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: TaskStatus): string {
    switch (value) {
      case TaskStatus.TODO:
        return 'До роботи';
      case TaskStatus.IN_PROGRESS:
        return 'В процесі';
      case TaskStatus.DONE:
        return 'Виконано';
      default:
        return value;
    }
  }
}