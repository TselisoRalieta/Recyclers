import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipsResourcesPage } from './tips-resources.page';

describe('TipsResourcesPage', () => {
  let component: TipsResourcesPage;
  let fixture: ComponentFixture<TipsResourcesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
