import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},

    {path:'home',loadComponent:()=>import('./components/home/home.component').then(c => c.HomeComponent) },
    {path:'employee',loadChildren:()=>import('./employee/employee.module').then(c => c.EmployeeModule) },
    {path:'role', loadChildren:()=>import('./components/role/role.module').then(c => c.RoleModule) },
    
    { path: '**', component: NotFoundComponent }
];
