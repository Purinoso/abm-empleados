import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import DatatableEmpleadoComponent from './components/datatable/datatable-empleado.component';
import EmpleadoService from '@/services/empleado/empleado.service';

@Component({
  selector: 'app-list-empleado',
  standalone: true,
  imports: [
    DatatableEmpleadoComponent
  ],
  templateUrl: './list-empleado.component.html',
  styleUrl: './list-empleado.component.css'
})
export default class ListEmpleadoComponent {
  private router: Router = inject(Router);
  private empleadoService: EmpleadoService = inject(EmpleadoService);

  handleEditClicked(empleadoId: number) {
    this.router.navigate(['empleado/edit', empleadoId]);
  }

  handleDeleteClicked(empleadoId: number) {
    this.empleadoService.deleteEmpleado(empleadoId);
  }
}