import { Routes } from '@angular/router';
export const routes: Routes = [
    {
      path: 'login',
      loadComponent: () => import('./features/pages/common/login/login').then(page => page.Login)
    },
    {
      path: '',
      loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then(component => component.MainLayoutComponent),
      children: [
        {
          path: '',
          loadComponent: () => import('./features/pages/common/home/home.page').then(page => page.HomePage)
        },

      ]
    }
]

/*
   Rota protegida: Dashboard principal (com safras e propriedades)
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [authGuard]  
    }
*/
