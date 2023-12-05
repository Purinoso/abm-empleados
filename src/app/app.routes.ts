import { Routes } from '@angular/router';
import { ListaEmpleadosComponent } from '@/components/lista-empleados/lista-empleados.component';

export const routes: Routes = [
    { path: '', redirectTo: 'empleado/list', pathMatch: 'full' },
    { path: 'empleado/list', component: ListaEmpleadosComponent },
    { path: '**', redirectTo: 'empleado/list' }
];