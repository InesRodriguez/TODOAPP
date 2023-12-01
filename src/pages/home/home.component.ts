import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Component, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../app/models/task.model';
import { TaskState } from './models/home.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tasks = signal<Task[]>([]);
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });
  stateteTask = TaskState;
  filter = signal<TaskState>(this.stateteTask.All);

  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });
  injector = inject(Injector);
  constructor() {}
  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }
  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    },{injector:this.injector});
  }
  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const newTasks = this.newTaskCtrl.value.trim();
      if (!newTasks) return;
      this.addTask(newTasks);
      this.newTaskCtrl.setValue('');
    }
  }

  addTask(task: string) {
    const newTask = { id: Date.now(), title: task, completed: false };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }
  updateTask(index: number) {
    this.tasks.update((tasks) => tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task)));
  }
  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) => (i === index ? { ...task, editing: !task.editing } : { ...task, editing: false }))
    );
  }
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => tasks.map((task, i) => (i === index ? { ...task, title: input.value, editing: false } : task)));
  }
  changeFilter(filter: TaskState) {
    this.filter.set(filter);
  }
}
