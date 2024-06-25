import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: "login",
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  }
];
