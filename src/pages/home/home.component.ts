import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../app/models/task.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  task = signal<Task[]>([
    { id: Date.now(), title: 'Instalar angular CLI', completed: false },
    { id: Date.now(), title: 'Crear proyecto', completed: false }
  ]);
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });
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
    this.task.update((tasks) => [...tasks, newTask]);
  }
  deleteTask(index: number) {
    this.task.update((tasks) => tasks.filter((_, i) => i !== index));
  }
  updateTask(index: number) {
    this.task.update((tasks) => tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task)));
  }
  updateTaskEditingMode(index: number) {
    this.task.update((tasks) => tasks.map((task, i) => (i === index ? { ...task, editing: !task.editing } : { ...task, editing: false })));
  }
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.task.update((tasks) => tasks.map((task, i) => (i === index ? { ...task, title: input.value, editing:false } : task)));
  }
}
