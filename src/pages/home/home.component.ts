import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../app/models/task.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  task = signal<Task[]>([
    { id: Date.now(), title: 'Instalar angular CLI', completed: false },
    { id: Date.now(), title: 'Crear proyecto', completed: false }
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTasks = input.value;
    this.addTask(newTasks);
  }

  addTask(task: string) {
    const newTask = { id: Date.now(), title: task, completed: false };
    this.task.update((tasks) => [...tasks, newTask]);
  }
  deleteTask(index: number) {
    this.task.update((tasks) => tasks.filter((_, i) => i !== index));
  }
  updateTask(index: number){
    this.task.update((tasks) => tasks.map((task, i) => i === index ? {...task, completed: !task.completed} : task));

  }
}
