import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getDatabase, ref as dbRef, get } from 'firebase/database';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.page.html',
  styleUrls: ['./admin-menu.page.scss'],
  standalone: false,
})
export class AdminMenuPage implements OnInit {
  firstName: string = 'Admin'; 

  constructor() {}

  ngOnInit() {
    const auth = getAuth();
    const db = getDatabase();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = dbRef(db, 'users/' + user.uid);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            this.firstName = data.name || 'Admin';
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    });
  }
}
