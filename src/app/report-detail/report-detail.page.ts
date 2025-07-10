import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get } from 'firebase/database';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.page.html',
  styleUrls: ['./report-detail.page.scss'],
  standalone: false,
})
export class ReportDetailPage implements OnInit {
  reports: any[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchReports();
  }

  fetchReports() {
    const db = getDatabase();
    const reportsRef = ref(db, 'reports');

    get(reportsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let allReports: any[] = [];

        Object.keys(data).forEach(userId => {
          const userReports = data[userId];
          Object.keys(userReports).forEach(reportId => {
            allReports.push(userReports[reportId]);
          });
        });

        this.reports = allReports;
        console.log('Fetched Reports:', this.reports);
      } else {
        this.reports = [];
        console.log('No reports found.');
      }
    }).catch((error) => {
      console.error('Error fetching reports:', error);
    });
  }
}
