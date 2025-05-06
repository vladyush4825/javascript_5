import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { Task } from '../core/models/task.model';
import { TaskStatus } from '../core/models/status.enum';

const forbiddenWordsValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value ? control.value.toLowerCase() : '';
  const hasForbiddenWords = /react|vue/.test(value);
  return hasForbiddenWords ? { forbiddenWords: true } : null;
};

const minYearValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  if (!value) return null; 
  const selectedDate = new Date(value);
  const currentYear = new Date().getFullYear(); 
  const selectedYear = selectedDate.getFullYear();
  return selectedYear < currentYear ? { minYear: true } : null;
};

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {
  // Декоратор @Output для передачі нового завдання до батьківського компонента
  @Output() taskAdded = new EventEmitter<Task>();
  // Декоратор @Input для отримання завдання для редагування
  @Input() taskToEdit: Task | null = null;
  // Декоратор @Output для передачі оновленого завдання
  @Output() taskUpdated = new EventEmitter<Task>();
  taskForm: FormGroup;
  TaskStatus = TaskStatus;
  // змінна для визначення режиму редагування
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', forbiddenWordsValidator],
      dueDate: [new Date(), [Validators.required, minYearValidator]],
      assignee: ['', Validators.required],
      status: [TaskStatus.TODO, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  // реакція на зміну taskToEdit
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.isEditMode = true;
      this.taskForm.patchValue({
        title: this.taskToEdit.title,
        description: this.taskToEdit.description,
        dueDate: new Date(this.taskToEdit.dueDate),
        assignee: this.taskToEdit.assignee,
        status: this.taskToEdit.status
      });
    } else {
      this.isEditMode = false;
      this.taskForm.reset({
        title: '',
        description: '',
        dueDate: new Date(),
        assignee: '',
        status: TaskStatus.TODO
      });
    }
  }

  // метод для збереження завдання (додавання або оновлення)
  saveTask(): void {
    if (this.taskForm.valid) {
      const dueDateValue = this.taskForm.get('dueDate')?.value;
      const dueDate = dueDateValue instanceof Date ? dueDateValue : new Date(dueDateValue);

      const task: Task = {
        ...this.taskForm.value,
        id: this.isEditMode && this.taskToEdit ? this.taskToEdit.id : Date.now(),
        dueDate: dueDate.toISOString().split('T')[0] // форматування дати в формат yyyy-MM-dd
      };

      if (this.isEditMode) {
        this.taskUpdated.emit(task);
      } else {
        this.taskAdded.emit(task);
      }

      // скидування форми після збереження
      this.isEditMode = false;
      this.taskToEdit = null;
      this.taskForm.reset({
        title: '',
        description: '',
        dueDate: new Date(),
        assignee: '',
        status: TaskStatus.TODO
      });
    }
  }

  // метод для скасування редагування
  cancelEdit(): void {
    this.isEditMode = false;
    this.taskToEdit = null;
    this.taskForm.reset({
      title: '',
      description: '',
      dueDate: new Date(),
      assignee: '',
      status: TaskStatus.TODO
    });
  }
}