import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipsResourcesPage } from './tips-resources.page';

const routes: Routes = [
  {
    path: '',
    component: TipsResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipsResourcesPageRoutingModule {}
