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
        {
          path: 'how-it-works', 
          loadComponent: () => import('./features/pages/common/how-it-works/how-it-works').then(page => page.HowItWorks)
        },
        {
          path: 'plans',
          loadComponent: () => import('./features/pages/common/plans/plans').then(page => page.Plans)
        },
        {
          path: 'about-us',
          loadComponent: () => import('./features/pages/common/about-us/about-us').then(page => page.AboutUs)
        },
        {
          path: 'help-and-support', 
          loadComponent: () => import('./features/pages/common/help-and-support/help-and-support').then(page => page.HelpAndSupport)
        },
        {
          path: 'leis/:slug',
          loadComponent: () => import('./features/pages/common/laws/laws').then(page => page.Laws)
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
