import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase, ref, onValue } from 'firebase/database'; // Changed get() to onValue for real-time updates
import { Observable } from 'rxjs';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.page.html',
  styleUrls: ['./guidelines.page.scss'],
  standalone: false,
})
export class GuidelinesPage implements OnInit {

  guidelines: { category: string; tips: string[] }[] = [];

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.loadGuidelines();
  }

  async loadGuidelines() {
    const userId = (await this.afAuth.currentUser)?.uid;

    if (userId) {
      const db = getDatabase();
      const tipsRef = ref(db, 'recycling-tips/' + userId);


      onValue(tipsRef, (snapshot) => {
        const tipsData = snapshot.val();
        if (tipsData) {

          this.guidelines = this.organizeTipsByCategory(tipsData);
        } else {
          console.log('No tips found for this user.');
        }
      }, (error) => {
        console.error('Error fetching tips:', error);
      });
    } else {
      console.log('User not authenticated');
    }
  }

  organizeTipsByCategory(tipsData: any): { category: string; tips: string[] }[] {
    const categories: { category: string; tips: string[] }[] = [];

    Object.keys(tipsData).forEach((key) => {
      const tip = tipsData[key];
      const categoryIndex = categories.findIndex(c => c.category === tip.category);

      if (categoryIndex === -1) {
        categories.push({ category: tip.category, tips: [tip.tip] });
      } else {
        categories[categoryIndex].tips.push(tip.tip);
      }
    });

    return categories.sort((a, b) => a.category.localeCompare(b.category));
  }
}
