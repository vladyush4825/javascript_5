import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/models/status.enum';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [TaskStatusPipe], 
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<number>();
  TaskStatus = TaskStatus; 

  deleteTask(): void {
    this.taskDeleted.emit(this.task.id);
  }

  changeStatus(): void {
    if (this.task.status === TaskStatus.TODO) {
      this.task.status = TaskStatus.IN_PROGRESS;
    } else if (this.task.status === TaskStatus.IN_PROGRESS) {
      this.task.status = TaskStatus.DONE;
    } else {
      this.task.status = TaskStatus.TODO;
    }
  }
}