import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDatabase, ref, set } from 'firebase/database';
import { from } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage {
  searchTerm: string = '';
  selectedMaterial: string = '';
  
  materials: string[] = ['Plastic', 'Metal', 'Glass', 'Electronics', 'Paper', 'Batteries'];
  
  recyclingCenters = [
    {
      name: 'Ha Pita',
      address: 'Lithoteng',
      hours: '9 AM - 5 PM',
      materials: ['Plastic', 'Paper'],
    },
    {
      name: 'Ha Pita',
      address: 'Main Cercle',
      hours: '10 AM - 6 PM',
      materials: ['Glass', 'Electronics'],
    },
    {
      name: 'Ha Matala',
      address: 'Filling Station',
      hours: '8 AM - 4 PM',
      materials: ['Plastic', 'Batteries', 'Glass'],
    },
    {
      name: 'Lithabaneng',
      address: 'Scalo',
      hours: '8 AM - 5 PM',
      materials: ['Metal', 'Batteries'],
    },
    {
      name: 'Lekhaloaneng',
      address: 'Opposite Filling Station',
      hours: '8 AM - 6 PM',
      materials: ['Plastic', 'Batteries', 'Glass'],
    },
    {
      name: 'Ha Thamae',
      address: 'Ha Khabisi',
      hours: '8 AM - 4 PM',
      materials: ['Plastic', 'Batteries', 'Glass'],
    },
    {
      name: 'Ha Leqele',
      address: 'Stopong se seholo',
      hours: '8 AM - 5:30 PM',
      materials: ['Metal', 'Batteries', 'Glass'],
    }
  ];

  filteredCenters = [...this.recyclingCenters];

  constructor(private firestore: AngularFirestore) {}

  filterCenters() {
    this.filteredCenters = this.recyclingCenters.filter(center => {
      const matchesSearch = this.searchTerm === '' || center.materials.some(material =>
        material.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

      const matchesMaterial = this.selectedMaterial === '' || center.materials.includes(this.selectedMaterial);

      return matchesSearch && matchesMaterial;
    });
  }

  onDetails(center: any) {
    console.log('Details clicked for:', center);

    const request = {
      userName: 'User Name',  
      materials: center.materials,
      center: center.name,
      date: new Date(),
      message: 'User message if any',  
      status: 'pending',
    };

    this.storeRequestInFirestore(request);
  }

  storeRequestInFirestore(request: any) {
    const db = getDatabase();
    const requestRef = ref(db, 'requests/' + new Date().getTime()); 
    set(requestRef, request)
      .then(() => {
        alert('Request stored successfully!');
      })
      .catch((error) => {
        console.error('Error storing request:', error);
        alert('Failed to store request.');
      });
  }

  openCenterInMaps(center: any) {
    const query = encodeURIComponent(`${center.name}, ${center.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }
}
