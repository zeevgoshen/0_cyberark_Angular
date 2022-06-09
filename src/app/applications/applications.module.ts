import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './applications-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DropDownComponent } from './dropdown/dropdown.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    DropDownComponent

  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    MatExpansionModule,

  ]
})
export class ApplicationsModule { }
