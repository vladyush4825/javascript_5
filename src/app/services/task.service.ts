import { Injectable } from '@angular/core';
import { Task } from '../core/models/task.model';
import { TASKS } from '../core/moc_data/tasks.data';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [...TASKS];

  constructor() {}

  addTask(newTask: Task): void {
    const maxId = this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) : 0;
    newTask.id = maxId + 1; // Присвоюємо новий ID
    this.tasks.push(newTask);
  }

  updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map(task =>
      task.id === updatedTask.id ? { ...updatedTask } : task
    );
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  getTasks(): Task[] {
    return [...this.tasks]; // Повертаємо копію масиву для безпеки
  }
}