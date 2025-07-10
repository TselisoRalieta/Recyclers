import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get } from 'firebase/database';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.page.html',
  styleUrls: ['./view-event.page.scss'],
  standalone: false,
})
export class ViewEventPage implements OnInit {
  events: any[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    const db = getDatabase();
    const eventsRef = ref(db, 'events');

    get(eventsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let allEvents: any[] = [];

        Object.keys(data).forEach(userId => {
          const userEvents = data[userId];
          Object.keys(userEvents).forEach(eventId => {
            allEvents.push(userEvents[eventId]);
          });
        });

        this.events = allEvents;
        console.log('Fetched Events:', this.events);
      } else {
        this.events = [];
        console.log('No events found.');
      }
    }).catch((error) => {
      console.error('Error fetching events:', error);
    });
  }
}
