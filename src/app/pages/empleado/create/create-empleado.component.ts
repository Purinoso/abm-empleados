import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import FormEmpleadoComponent from '../components/form/form-empleado.component';
import Empleado from '@/interfaces/empleado.interface';
import EmpleadoService from '@/services/empleado/empleado.service';

@Component({
  selector: 'app-create-empleado',
  standalone: true,
  imports: [
    FormEmpleadoComponent
  ],
  templateUrl: './create-empleado.component.html',
  styleUrl: './create-empleado.component.css'
})
export default class CreateEmpleadoComponent {
  private empleadoService: EmpleadoService = inject(EmpleadoService);
  private router: Router = inject(Router);
  private nextEmpleadoId: number | undefined;

  constructor() {
    this.empleadoService.getEmpleadosSubject().subscribe(empleados => {
      this.nextEmpleadoId = empleados.length + 1;
    });
  }

  onFormSubmit(submittedEmpleado: Empleado) {
    submittedEmpleado.id = this.nextEmpleadoId;
    this.empleadoService.addEmpleado(submittedEmpleado);

    this.router.navigate(['empleado/list']);
  }
}