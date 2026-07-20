import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.OrbitLoginPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
  },
  {
    path: 'patients',
    loadComponent: () => import('./pages/patients/patients.page').then(m => m.PatientsPage),
  },
  {
    path: 'patients/:id',
    loadComponent: () => import('./pages/patient-detail/patient-detail.page').then(m => m.PatientDetailPage),
  },
  {
    path: 'agenda',
    loadComponent: () => import('./pages/agenda/agenda.page').then(m => m.AgendaPage),
  },
  {
    path: 'financeiro',
    loadComponent: () => import('./pages/financeiro/financeiro.page').then(m => m.FinanceiroPage),
  },
  {
    path: 'teleatendimento',
    loadComponent: () => import('./pages/teleatendimento/teleatendimento.page').then(m => m.TeleatendimentoPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.OrbitSettingsPage),
  },
];
