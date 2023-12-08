import { Routes } from '@angular/router';

import ListEmpleadoComponent from '@/pages/empleado/list/list-empleado.component';
import CreateEmpleadoComponent from '@/pages/empleado/create/create-empleado.component';
import EditEmpleadoComponent from '@/pages/empleado/edit/edit-empleado.component';

export const routes: Routes = [
    { path: 'empleado/list', title: 'Lista de empleados', component: ListEmpleadoComponent },
    { path: 'empleado/create', title: 'Crear empleado', component: CreateEmpleadoComponent },
    { path: 'empleado/edit/:id', title: 'Editar empleado', component: EditEmpleadoComponent },
    { path: '', redirectTo: 'empleado/list', pathMatch: 'full' },
    { path: '**', redirectTo: 'empleado/list' },
];