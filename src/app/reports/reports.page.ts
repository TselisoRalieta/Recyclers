import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { from } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: false,
})
export class ReportsPage {
  title: string = '';
  description: string = '';
  category: string = '';

  constructor(
    private toastController: ToastController,
    private afAuth: AngularFireAuth
  ) {}

  async submitReport() {
    try {
      const data = {
        title: this.title,
        description: this.description,
        category: this.category,
        timestamp: new Date().toISOString(),
      };

      const userId = (await this.afAuth.currentUser)?.uid;

      if (userId) {

        const db = getDatabase();
        const reportRef = ref(db, 'reports/' + userId + '/' + Date.now());
        from(set(reportRef, data)).subscribe({
          next: () => {
            const toast = this.toastController.create({
              message: 'Report submitted successfully!',
              duration: 2000,
              color: 'success',
            });
            toast.then(toastInstance => toastInstance.present());
            
            this.title = '';
            this.description = '';
            this.category = '';
          },
          error: (err) => {
            const toast = this.toastController.create({
              message: 'Failed to submit report. Try again.',
              duration: 2000,
              color: 'danger',
            });
            toast.then(toastInstance => toastInstance.present());
            console.error('Error submitting report:', err);
          },
        });
      } else {
        const toast = this.toastController.create({
          message: 'Please log in to submit a report.',
          duration: 2000,
          color: 'warning',
        });
        toast.then(toastInstance => toastInstance.present());
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  }
}
