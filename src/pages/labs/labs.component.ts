import { Component } from '@angular/core';
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
  name = 'Ines';
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
    console.log(event);
  }
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);

  }
}