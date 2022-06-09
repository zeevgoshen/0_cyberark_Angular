import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':appId/details',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class routing { }
