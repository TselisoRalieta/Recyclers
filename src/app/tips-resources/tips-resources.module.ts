import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipsResourcesPageRoutingModule } from './tips-resources-routing.module';

import { TipsResourcesPage } from './tips-resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipsResourcesPageRoutingModule
  ],
  declarations: [TipsResourcesPage]
})
export class TipsResourcesPageModule {}
