import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/models/status.enum';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { TaskFormComponent } from '../../task-form/task-form.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskStatusPipe, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  TaskStatus = TaskStatus;
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); // Завантажуємо задачі при ініціалізації
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks];
  }

  filterTasks(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value as TaskStatus;
    if (status) {
      this.filteredTasks = this.tasks.filter(task => task.status === status);
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks(); // Оновлюємо списки після видалення
  }

  takeTask(task: Task): void {
    task.status = TaskStatus.IN_PROGRESS;
    this.taskService.updateTask(task);
    this.loadTasks(); // Оновлюємо списки
  }

  changeStatus(task: Task, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value as TaskStatus;
    task.status = newStatus;
    this.taskService.updateTask(task);
    this.loadTasks(); // Оновлюємо списки
  }

  addTask(task: Task): void {
    this.taskService.addTask(task);
    this.loadTasks(); // Оновлюємо списки
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task }; // Створюємо копію для редагування
  }

  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask);
    this.selectedTask = null;
    this.loadTasks(); // Оновлюємо списки
  }
}