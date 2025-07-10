import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { from } from 'rxjs';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
  standalone: false,
})
export class CreateEventPage {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      datetime: ['', Validators.required],
      location: ['', Validators.required],
      material: ['', Validators.required],
    });
  }

  async submitEvent() {
    const data = this.eventForm.value;
    console.log('📅 Event Created:', data);

    const userId = (await this.afAuth.currentUser)?.uid;

    if (userId) {
      const db = getDatabase();
      const eventRef = ref(db, 'events/' + userId + '/' + Date.now()); 
      from(
        set(eventRef, {
          title: data.title,
          description: data.description,
          datetime: data.datetime,
          location: data.location,
          material: data.material,
          userId: userId,
        })
      ).subscribe({
        next: () => {
          alert('Event created successfully!');
          this.eventForm.reset();
        },
        error: (err) => {
          console.error('Error creating event:', err);
          alert(' Error creating event');
        },
      });
    } else {
      alert('Please log in to create an event.');
    }
  }

  selectAllMaterials() {
    const allMaterials = ['Plastic', 'Electronics', 'Glass', 'Paper', 'Hazardous'];
    this.eventForm.patchValue({ material: allMaterials });
  }
}
