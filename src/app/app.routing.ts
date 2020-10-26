import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { SingleViewComponent } from './single-view/single-view.component';
import { ViewComponent } from './view/view.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  { path: 'view', component: ViewComponent },
  { path: 'single-view/:id', component: SingleViewComponent },
];
