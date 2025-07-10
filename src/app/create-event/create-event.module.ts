import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Added ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { CreateEventPageRoutingModule } from './create-event-routing.module';

import { CreateEventPage } from './create-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ✅ Important for formGroup to work
    IonicModule,
    CreateEventPageRoutingModule
  ],
  declarations: [CreateEventPage]
})
export class CreateEventPageModule {}
