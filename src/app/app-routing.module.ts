import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'applications',
    pathMatch: 'full'
  },
  {
    path: 'applications',
    loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
