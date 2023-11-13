import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  task = ['Instalar angular CLI', 'Crear proyecto', 'Crear componentes'];
  name = signal('Ines');
  age = 30;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Ines',
    age: 30,
    disabled: true,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  };
  clickHandler() {
    alert('Hola Mundo');
  }
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
    console.log(input.value);
  }
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);

  }
}
