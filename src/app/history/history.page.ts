import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get } from 'firebase/database';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit {

  requests: any[] = []; 

  constructor() {}

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    const db = getDatabase();
    const requestsRef = ref(db, 'requests');

    get(requestsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.requests = this.convertDataToArray(data); 
      } else {
        console.log("No data available");
        this.requests = [];
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  convertDataToArray(data: any): any[] {
    return Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
  }
}
