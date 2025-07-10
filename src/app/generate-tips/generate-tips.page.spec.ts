import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateTipsPage } from './generate-tips.page';

describe('GenerateTipsPage', () => {
  let component: GenerateTipsPage;
  let fixture: ComponentFixture<GenerateTipsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
