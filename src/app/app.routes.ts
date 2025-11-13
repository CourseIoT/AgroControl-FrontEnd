import {Routes} from '@angular/router';


import {RegisterPageComponent} from './profile-management/pages/register-page/register-page.component';
import {LoginPageComponent} from './profile-management/pages/login-page/login-page.component';
import {isNotAuthenticatedGuard} from "./profile-management/guards/is-not-authenticated-guard.guard";
import {isAuthenticatedGuard} from "./profile-management/guards/is-authenticated-guard.guard";
import {
  HomeAgriculturalProcessComponent
} from "./public/pages/home-agricultural-process/home-agricultural-process.component";
import {HomeViewComponent} from "./agricultural-process/pages/home-view/home-view.component";
import {FieldsViewComponent} from "./fields/pages/fields-view/fields-view.component";
import {WorkerManagementComponent} from "./fields/pages/worker-management/worker-management.component";
import {
  CropTreatmentViewComponent
} from "./agricultural-process/pages/crop-treatment-view/crop-treatment-view.component";
import {IrrigationHistoryComponent} from "./agricultural-process/pages/irrigation-history/irrigation-history.component";
import {
  SubscriptionSelectionComponent
} from "./subscriptions/pages/subscription-selection/subscription-selection.component";
import {ProductsInventoryComponent} from "./store/pages/products-inventory/products-inventory.component";
import {
  AgriculturalActivitySchedulerComponent
} from "./agricultural-process/pages/agricultural-activity-scheduler/agricultural-activity-scheduler.component";
import {HarvestHistoryComponent} from "./agricultural-process/pages/harvest-history/harvest-history.component";
import {FinanceViewComponent} from "./finances/pages/finance-view/finance-view.component";
import {ProductsProducerComponent} from "./store/pages/products-producer/products-producer.component";
import {ProductsStoreComponent} from "./store/pages/products-store/products-store.component";
import {HomeDistributorComponent} from "./public/pages/home-distributor/home-distributor.component";
import {SalesHistoryComponent} from "./store/pages/sales-history/sales-history.component";
import {ProfilePageComponent} from "./profile-management/pages/profile-page/profile-page.component";
import { HomeViewDistributorComponent } from './distributor-proccess/pages/home-view-distributor/home-view-distributor.component';


export const routes: Routes = [
  { path: 'register', component: RegisterPageComponent, canActivate: [ isNotAuthenticatedGuard ] },
  { path: 'login', component: LoginPageComponent, canActivate: [ isNotAuthenticatedGuard ], },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'subscription-selection',
    component: SubscriptionSelectionComponent,
  },

  {
    path: 'home-distributor/:id',
    component: HomeDistributorComponent,
    canActivate: [isAuthenticatedGuard],
    data: { roles: ['ROLE_DISTRIBUTOR'] },
    children: [
      {
        path: '',
        component: HomeViewDistributorComponent
      },
      {
        path: 'profile-distributor/:id',
        component: ProfilePageComponent,
      },
      {
        path: 'your-products',
        component: ProductsInventoryComponent,
      },
      {
        path: 'sale-history',
        component: SalesHistoryComponent,
      }
    ]
  },

  // Rutas protegidas para ROLE_AGRICULTURAL_PRODUCER
  {
    path: '',
    component: HomeAgriculturalProcessComponent,
    canActivate: [isAuthenticatedGuard],
    data: { roles: ['ROLE_AGRICULTURAL_PRODUCER'] },
    children: [
      {
        path: 'fields',
        component: FieldsViewComponent },

      {
        path: 'profile-producer/:id',
        component: ProfilePageComponent,
      },
      {
        path: 'home-agricultural-process/:id',
        component: HomeViewComponent,
      },
      {
        path: 'worker-management',
        component: WorkerManagementComponent,
      },
      {
        path: 'activity-scheduler/:activityType',
        component: AgriculturalActivitySchedulerComponent,
      },
      {
        path: 'Irrigation-history',
        component: IrrigationHistoryComponent,
      },
      {
        path: 'CropTreatment-history',
        component: CropTreatmentViewComponent,
      },
      {
        path: 'Harvest-history',
        component: HarvestHistoryComponent,
      },
      {
        path: 'store',
        component: ProductsStoreComponent,
      },
      {
        path: 'products-inventory',
        component: ProductsProducerComponent
      },
      {
        path: 'finance-view',
        component: FinanceViewComponent,
      }
    ]
  }
];
