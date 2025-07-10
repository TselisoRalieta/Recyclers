import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref as dbRef, get } from 'firebase/database';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.page.html',
  styleUrls: ['./home-menu.page.scss'],
  standalone: false,
})
export class HomeMenuPage implements OnInit {
  firstName: string = 'User'; // default fallback

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
            this.firstName = data.name || 'User';
          }
        } catch (error) {
          console.error('Error fetching user name:', error);
        }
      }
    });
  }
}
