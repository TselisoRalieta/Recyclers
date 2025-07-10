import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDatabase, ref, set } from 'firebase/database';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  showPassword = false;

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  contacts = '';
  location = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async register() {
    const db = getDatabase();
    console.log("register");

    return from(
      this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          const userRef = ref(db, 'users/' + cred.user?.uid);
          return set(userRef, {
            uid: cred.user?.uid,
            name: this.firstName,
            surname: this.lastName,
            email: this.email,
            phone: this.contacts,
            location: this.location,
            role: "user"
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert("This Email is already registered. Log in instead");
          } else {
            alert(error);
            console.error('Registration failed:', error);
          }
        })
    );
  }
}
