import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models/task.model';
import { TASKS } from '../../core/moc_data/tasks.data';
import { TaskStatus } from '../../core/models/status.enum';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { TaskFormComponent } from '../../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskStatusPipe, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: Task[] = TASKS;
  filteredTasks: Task[] = [...TASKS];
  TaskStatus = TaskStatus;
  // змінна для зберігання завдання, яке редагується
  selectedTask: Task | null = null;

  filterTasks(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value;
    if (status) {
      this.filteredTasks = this.tasks.filter(task => task.status === status);
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.filteredTasks = [...this.tasks];
  }

  takeTask(task: Task): void {
    task.status = TaskStatus.IN_PROGRESS;
    this.filteredTasks = [...this.tasks];
  }

  changeStatus(task: Task, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value as TaskStatus;
    task.status = newStatus;
    this.filteredTasks = [...this.tasks];
  }

  addTask(task: Task): void {
    this.tasks.push(task); // обробка події taskAdded і додавання нового завдання
    this.filteredTasks = [...this.tasks];
  }

  // метод для ініціалізації редагування завдання
  editTask(task: Task): void {
    this.selectedTask = task;
  }

  // метод для обробки оновлення завдання
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.filteredTasks = [...this.tasks];
    }
    this.selectedTask = null;
  }
}