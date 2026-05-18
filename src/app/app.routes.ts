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
        path: 'properties/:propertyId/seasons', 
        loadComponent: () => import('./features/pages/producer/seasons/seasons')
          .then(page => page.Seasons)
      },
      {
        path: 'properties/:propertyId/fields', 
        loadComponent: () => import('./features/pages/producer/fields/fields')
          .then(page => page.Fields)
      },
      {
        path: 'properties/:propertyId/crop-varieties/:fieldId',
        loadComponent: () => import('./features/pages/producer/crop-varieties/crop-varieties')
          .then(page => page.CropVarieties)
      },
      {
        path: 'properties/:propertyId/plantings',
        loadComponent: () => import('./features/pages/producer/plantings/plantings')
          .then(page => page.Plantings)
      },
      {
        path: 'properties/:propertyId/plantings/:plantingId/harvests',
        loadComponent: () => import('./features/pages/producer/harvests/harvests')
          .then(page => page.Harvests)
      },
      {
        path: 'properties/:propertyId/plantings/:plantingId/stock',
        loadComponent: () => import('./features/pages/producer/stock/stock')
          .then(page => page.Stock)
      },
      {
        path: 'properties/:propertyId/plantings/:plantingId/prescriptions',
        loadComponent: () => import('./features/pages/producer/prescription/prescription')
          .then(page => page.Prescription)
      },
      {
        path: 'properties/:propertyId/plantings/:plantingId/batches',
        loadComponent: () => import('./features/pages/producer/batches/batches')
          .then(page => page.Batches)
      },
      {
        path: 'properties/:propertyId/plantings/:plantingId/planting-inputs',
        loadComponent: () => import('./features/pages/producer/planting-inputs/planting-inputs')
          .then(page => page.PlantingInputs)
      },
      {
        path: 'properties/:propertyId/plantings/:plantingId/forecasts',
        loadComponent: () => import('./features/pages/producer/harvest-forecasts/harvest-forecasts')
          .then(page => page.HarvestForecasts)
      },
      {
        path: 'properties/:propertyId/plantings/:plantingId/practices',
        loadComponent: () => import('./features/pages/producer/agricultural-practices/agricultural-practices')
          .then(page => page.AgriculturalPractices)
      },
      {
        path: 'properties/:propertyId/plantings/:plantingId/warehouses',
        loadComponent: () => import('./features/pages/producer/warehouse/warehouse')
          .then(page => page.Warehouse)
      },
      {
        path: 'properties/:propertyId/batches/:batchId/batch-dashboard',
        loadComponent: () => import('./features/pages/producer/graphics/batches/batches')
          .then(page => page.Batches)
      },
      {
        path: 'properties/:propertyId/planning',
        loadComponent: () => import('./features/pages/producer/graphics/planning/planning')
          .then(page => page.Planning)
      },
      {
        path: 'properties/:propertyId/stock',
        loadComponent: () => import('./features/pages/producer/graphics/stock/stock')
          .then(page => page.Stock)
      },
      {
        path: 'properties/:propertyId/harvests',
        loadComponent: () => import('./features/pages/producer/graphics/harvests/harvests')
          .then(page => page.Harvests)
      },
      {
        path: 'properties/:propertyId/planting-dashboard',
        loadComponent: () => import('./features/pages/producer/graphics/plantings/plantings')
          .then(page => page.Plantings)
      },
      {
        path: 'profile',
        loadComponent: () => import('./shared/layouts-components/user-profile/user-profile')
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
      },
      {
        path: 'barter',
        loadComponent: () => import('./features/pages/common/barter/barter-catalog/barter-catalog')
            .then(page => page.BarterCatalog)
      },
      {
        path: 'my-offers',
        loadComponent: () => import('./features/pages/common/barter/barter-components/my-offers/my-offers')
            .then(page => page.MyOffers)
      },
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
        path: 'profile',
        loadComponent: () => import('./shared/layouts-components/user-profile/user-profile')
          .then(page => page.UserProfile)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/pages/admin/users/users')
          .then(page => page.Users)
      },
      {
        path: 'inputs',
        loadComponent: () => import('./features/pages/admin/inputs/inputs')
          .then(page => page.AdminInputs)
      },
      {
        path: 'input/categories',
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
      {
        path: 'support',
        loadComponent: () => import('./features/pages/admin/support/support')
          .then(page => page.Support)
      },
      {
        path: 'barter',
        loadComponent: () => import('./features/pages/common/barter/barter-catalog/barter-catalog')
            .then(page => page.BarterCatalog)
      }
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
        path: 'profile',
        loadComponent: () => import('./shared/layouts-components/user-profile/user-profile')
          .then(page => page.UserProfile)
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
      {
        path: 'barter',
        loadComponent: () => import('./features/pages/common/barter/barter-catalog/barter-catalog')
            .then(page => page.BarterCatalog)
      },
      {
        path: 'my-transactions',
        loadComponent: () => import('./features/pages/common/barter/my-transactions/my-transactions')
            .then(page => page.MyTransactions)
      },
      {
        path: 'help-and-support',
        loadComponent: () => import('./features/pages/common/help-and-support/help-and-support')
          .then(page => page.HelpAndSupport)
      }
    ]
  },

  { path: '**', redirectTo: '' }
];