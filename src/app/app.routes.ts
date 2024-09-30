import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('@home/features').then((m) => m.HomeComponent),
  },
  {
    path: 'history',
    loadComponent: () => import('@history').then((m) => m.HistoryComponent),
    outlet: 'history',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home(history:/history)',
  },
];
