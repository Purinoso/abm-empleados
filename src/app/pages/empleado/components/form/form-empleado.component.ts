import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import Empleado from '@/interfaces/empleado.interface';

@Component({
  selector: 'form-empleado',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './form-empleado.component.html',
  styleUrl: './form-empleado.component.css'
})
export default class FormEmpleadoComponent {
  // El input empleado se pasará cuando se quiera editar a un empleado ya existente (EditEmpleadoComponent), caso contrario, será para crear uno nuevo (CreateEmpleadoComponent).
  @Input() empleado?: Empleado;
  @Output() formSubmit = new EventEmitter<Empleado>();

  empleadoForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,-\/]+$/)
    ]),
    department: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,-\/]+$/)
    ]),
    jobTitle: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.,-\/]+$/)
    ])
  })

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'Este campo es requerido.' : 'Solo se admiten letras, espacios y algunos caracteres especiales.';
  }

  ngOnInit() {
    if (this.empleado) {
      this.empleadoForm.controls.name.setValue(this.empleado.name);
      this.empleadoForm.controls.department.setValue(this.empleado.department);
      this.empleadoForm.controls.jobTitle.setValue(this.empleado.jobTitle);
    }
  }

  handleSubmit() {
    const submittedEmpleado: Empleado = {
      id: this.empleado?.id,
      name: this.empleadoForm.controls.name.value!,
      jobTitle: this.empleadoForm.controls.jobTitle.value!,
      department: this.empleadoForm.controls.department.value!
    }

    this.formSubmit.emit(submittedEmpleado);
  }
}