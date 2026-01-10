import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./features/pages/home/home.page').then((page) => page.HomePage)
    }
];

/*
   Rota protegida: Dashboard principal (com safras e propriedades)
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [authGuard]  
    }
*/
