import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UBodyComponent } from './body.component';

describe('UBodyComponent', () => {
  let component: UBodyComponent;
  let fixture: ComponentFixture<UBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
