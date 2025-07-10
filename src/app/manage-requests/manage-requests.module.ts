import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageRequestsPageRoutingModule } from './manage-requests-routing.module';

import { ManageRequestsPage } from './manage-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageRequestsPageRoutingModule
  ],
  declarations: [ManageRequestsPage]
})
export class ManageRequestsPageModule {}
