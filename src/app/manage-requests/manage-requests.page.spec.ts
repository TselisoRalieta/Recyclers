import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageRequestsPage } from './manage-requests.page';

describe('ManageRequestsPage', () => {
  let component: ManageRequestsPage;
  let fixture: ComponentFixture<ManageRequestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
