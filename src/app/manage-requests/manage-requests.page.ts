import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get, update, remove } from 'firebase/database';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.page.html',
  styleUrls: ['./manage-requests.page.scss'],
  standalone: false,
})
export class ManageRequestsPage implements OnInit {
  requests: any[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    const db = getDatabase();
    const requestsRef = ref(db, 'requests');

    get(requestsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('Fetched Requests:', data);  // You can keep this for debugging
          
          this.requests = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }))
          .filter(request => request.status === 'pending'); // Only pending requests
        } else {
          this.requests = [];
          console.log('No requests found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching requests:', error);
      });
  }

  acceptRequest(request: any) {
    const db = getDatabase();
    const requestRef = ref(db, `requests/${request.id}`);

    update(requestRef, { status: 'accepted' })
      .then(() => {
        alert(`Accepted request from ${request.userName}`);
        this.fetchRequests(); 
      })
      .catch((error) => {
        console.error('Error accepting request:', error);
      });
  }

  denyRequest(request: any) {
    const db = getDatabase();
    const requestRef = ref(db, `requests/${request.id}`);

    update(requestRef, { status: 'denied' })
      .then(() => {
        alert(` Denied request from ${request.userName}`);
        this.fetchRequests(); 
      })
      .catch((error) => {
        console.error('Error denying request:', error);
      });
  }
}
