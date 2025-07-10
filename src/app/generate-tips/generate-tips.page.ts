import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { from } from 'rxjs';

@Component({
  selector: 'app-generate-tips',
  templateUrl: './generate-tips.page.html',
  styleUrls: ['./generate-tips.page.scss'],
  standalone: false,
})
export class GenerateTipsPage implements OnInit {
  
  guidelines: { category: string; tips: string[] }[] = [
    {
      category: 'Plastics',
      tips: []  
    },
    {
      category: 'Electronics (e-waste)',
      tips: []  
    },
    {
      category: 'Batteries',
      tips: []  
    },
    {
      category: 'Glass',
      tips: []  
    },
    {
      category: 'Hazardous waste',
      tips: [] 
    }

  ];


  newTipCategory: string = '';
  newTip: string = '';

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {}

  async addTip() {
    if (this.newTipCategory && this.newTip) {
      const category = this.guidelines.find(item => item.category === this.newTipCategory);
      if (category) {
        category.tips.push(this.newTip);

        const userId = (await this.afAuth.currentUser)?.uid;

        if (userId) {
          const db = getDatabase();
          const tipRef = ref(db, 'recycling-tips/' + userId + '/' + Date.now());
          from(
            set(tipRef, {
              category: this.newTipCategory,
              tip: this.newTip,
              userId: userId,
            })
          ).subscribe({
            next: () => {
              alert(' Tip added successfully!');
              this.resetForm();
            },
            error: (err) => {
              console.error('Error adding tip:', err);
              alert(' Error adding tip');
            },
          });
        } else {
          alert('Please log in to add tips.');
        }
      } else {
        alert('Category not found!');
      }
    } else {
      alert('Please provide both category and tip!');
    }
  }

  resetForm() {
    this.newTipCategory = '';
    this.newTip = '';
  }
}
