import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDatabase, ref, get } from 'firebase/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  showPassword = false;
  email = '';
  password = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const db = getDatabase();
          const userRef = ref(db, 'users/' + user.uid);

          get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              if (userData.role === 'admin') {
                this.router.navigate(['/admin-menu']);
              } else {
                this.router.navigate(['/home-menu']);
              }
            } else {
              console.error("No user data found.");
            }
          }).catch((error) => {
            console.error("Error fetching user data:", error);
          });
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      });
  }
}
