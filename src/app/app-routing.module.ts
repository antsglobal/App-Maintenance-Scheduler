import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guest',
    pathMatch: 'full'
  },
  {
    path: 'guest',
    loadChildren: () => import('./guest/guest.module').then(module => module.GuestModule)
  },
  {
    path: 'assets',
    loadChildren: () => import('./assets/assets.module').then(module => module.AssetsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
