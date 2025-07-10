import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateTipsPage } from './generate-tips.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateTipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateTipsPageRoutingModule {}
