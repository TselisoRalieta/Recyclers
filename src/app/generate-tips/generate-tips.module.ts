import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateTipsPageRoutingModule } from './generate-tips-routing.module';

import { GenerateTipsPage } from './generate-tips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateTipsPageRoutingModule
  ],
  declarations: [GenerateTipsPage]
})
export class GenerateTipsPageModule {}
