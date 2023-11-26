import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  task = signal(['Instalar angular CLI', 'Crear proyecto', 'Crear componentes']);
  name = signal('Ines');
  age = 30;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'Ines',
    age: 30,
    disabled: true,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });
  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, { nonNullable: true });
  nameCtrl = new FormControl('Ines', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
  clickHandler() {
    alert('Hola Mundo');
  }
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
    console.log(input.value);
  }
  changeHandlerObjectName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((person) => ({ ...person, name: newValue }));
    console.log(input.value);
  }
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
