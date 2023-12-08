import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Empleado from '@/interfaces/empleado.interface';
import FormEmpleadoComponent from '../components/form/form-empleado.component';
import EmpleadoService from '@/services/empleado/empleado.service';

@Component({
  selector: 'app-edit-empleado',
  standalone: true,
  imports: [
   FormEmpleadoComponent 
  ],
  templateUrl: './edit-empleado.component.html',
  styleUrl: './edit-empleado.component.css'
})
export default class EditEmpleadoComponent {
  private empleadoService: EmpleadoService = inject(EmpleadoService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  empleado: Empleado | undefined;

  constructor() {
    const empleadoId = Number(this.activatedRoute.snapshot.params['id']);
    const empleado = this.empleadoService.getEmpleado(empleadoId);

    if (!empleado) {
      this.router.navigate(['empleado/list']);
    } else {
      this.empleado = empleado;
    }
  }

  onFormSubmit(submittedEmpleado: Empleado) {
    this.empleadoService.udpateEmpleado(submittedEmpleado);
    this.router.navigate(['empleado/list']);
  }
}