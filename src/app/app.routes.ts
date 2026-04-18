import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  {
    path: 'login/:role',
    loadComponent: () => import('./features/pages/common/login/login')
      .then(page => page.Login)
  },

  {
    path: 'login',
    redirectTo: 'login/producer',
    pathMatch: 'full'
  },

  {
    path: 'register/producer',
    loadComponent: () => import('./features/pages/common/producer-register/producer-register')
      .then(page => page.ProducerRegister)
  },

  {
    path: 'register/supplier-admin',
    loadComponent: () => import('./features/pages/common/supplier-admin-register/supplier-admin-register')
      .then(page => page.SupplierAdminRegister)
  },

  {
    path: 'forgot-password',
    loadComponent: () => import('./features/pages/common/forgot-password/forgot-password')
      .then(page => page.ForgotPassword)
  },

  {
    path: 'unauthorized',
    loadComponent: () => import('./features/pages/common/unauthorized/unauthorized')
      .then(page => page.Unauthorized)
  },

  {
    path: '',
    loadComponent: () => import('./core/layouts/main-layout/main-layout.component')
      .then(c => c.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/pages/common/home/home.page')
          .then(page => page.HomePage)
      },
      {
        path: 'how-it-works',
        loadComponent: () => import('./features/pages/common/how-it-works/how-it-works')
          .then(page => page.HowItWorks)
      },
      {
        path: 'plans',
        loadComponent: () => import('./features/pages/common/plans/plans')
          .then(page => page.Plans)
      },
      {
        path: 'about-us',
        loadComponent: () => import('./features/pages/common/about-us/about-us')
          .then(page => page.AboutUs)
      },
      {
        path: 'help-and-support',
        loadComponent: () => import('./features/pages/common/help-and-support/help-and-support')
          .then(page => page.HelpAndSupport)
      },
      {
        path: 'leis/:slug',
        loadComponent: () => import('./features/pages/common/laws/laws')
          .then(page => page.Laws)
      },
    ]
  },

  {
    path: 'producer',
    canActivate: [authGuard, roleGuard],
    data: { role: 'PRODUCER' },
    loadComponent: () => import('./core/layouts/producer-layout/producer-layout')
      .then(c => c.ProducerLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/pages/producer/dashboard/dashboard')
          .then(page => page.ProducerDashboard)
      },
      {
        path: 'weather',
        loadComponent: () => import('./features/pages/producer/weather/weather')
          .then(page => page.Weather)
      },
      {
        path: 'property-create',
        loadComponent: () => import('./features/pages/producer/properties/property-create/property-create')
          .then(page => page.PropertyCreate)
      },
      {
        path: 'properties',
        loadComponent: () => import('./features/pages/producer/properties/list-properties/list-properties')
          .then(page => page.ListProperties)
      },
      {
        path: 'properties/:id',
        loadComponent: () => import('./features/pages/producer/properties/property-detail/property-detail')
          .then(page => page.PropertyDetail)
      },
      {
        path: 'seasons',
        loadComponent: () => import('./features/pages/producer/seasons/seasons')
          .then(page => page.Seasons)
      },
      {
        path: 'fields',
        loadComponent: () => import('./features/pages/producer/fields/fields')
          .then(page => page.Fields)
      },
      {
        path: 'plantings',
        loadComponent: () => import('./features/pages/producer/plantings/list-plantings/list-plantings')
          .then(page => page.ListPlantings)
      },
      {
        path: 'plantings/:id',
        loadComponent: () => import('./features/pages/producer/plantings/planting-detail/planting-detail')
          .then(page => page.PlantingDetail)
      },
      {
        path: 'harvests',
        loadComponent: () => import('./features/pages/producer/harvests/list-harvests/list-harvests')
          .then(page => page.ListHarvests)
      },
      {
        path: 'harvests/:id',
        loadComponent: () => import('./features/pages/producer/harvests/harvest-detail/harvest-detail')
          .then(page => page.HarvestDetail)
      },
      {
        path: 'stock',
        loadComponent: () => import('./features/pages/producer/stock/stock')
          .then(page => page.Stock)
      },
      {
        path: 'batches',
        loadComponent: () => import('./features/pages/producer/batches/batches')
          .then(page => page.Batches)
      },
      {
        path: 'assets',
        loadComponent: () => import('./features/pages/producer/assets/assets')
          .then(page => page.Assets)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/pages/producer/user-profile/user-profile')
          .then(page => page.UserProfile)
      },
      {
        path: 'help-and-support',
        loadComponent: () => import('./features/pages/common/help-and-support/help-and-support')
          .then(page => page.HelpAndSupport)
      },
      {
        path: 'market',
        loadComponent: () => import('./features/pages/producer/market/market')
          .then(page => page.Market)
      }
    ]
  },

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'SYSTEM_ADMIN' },
    loadComponent: () => import('./core/layouts/admin-layout/admin-layout')
      .then(c => c.AdminLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/pages/admin/dashboard/dashboard')
          .then(page => page.Dashboard)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/pages/admin/users/users')
          .then(page => page.Users)
      },
      {
        path: 'inputs',
        loadComponent: () => import('./features/pages/admin/inputs/list-inputs/list-inputs')
          .then(page => page.ListInputs)
      },
      {
        path: 'input-categories',
        loadComponent: () => import('./features/pages/admin/inputs/input-categories/input-categories')
          .then(page => page.InputCategories)
      },
      {
        path: 'crops',
        loadComponent: () => import('./features/pages/admin/crops/crops')
          .then(page => page.Crops)
      },
      {
        path: 'suppliers',
        loadComponent: () => import('./features/pages/admin/suppliers/suppliers')
          .then(page => page.Suppliers)
      },
      {
        path: 'assets-approval',
        loadComponent: () => import('./features/pages/admin/assets-approval/assets-approval')
          .then(page => page.AssetsApproval)
      },
    ]
  },

  {
    path: 'supplier',
    canActivate: [authGuard, roleGuard],
    data: { role: 'SUPPLIER_ADMIN' },
    loadComponent: () => import('./core/layouts/supplier-layout/supplier-layout')
      .then(c => c.SupplierLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/pages/supplier/dashboard/dashboard')
          .then(page => page.SupplierDashboard)
      },
      {
        path: 'batches',
        loadComponent: () => import('./features/pages/supplier/batches/batches')
          .then(page => page.Batches)
      },
      {
        path: 'inputs',
        loadComponent: () => import('./features/pages/supplier/inputs/inputs')
          .then(page => page.SupplierInputs)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/pages/supplier/profile/profile')
          .then(page => page.SupplierProfile)
      },
    ]
  },

  { path: '**', redirectTo: '' }
];