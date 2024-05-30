import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanaderiaBodyComponent } from './body.component';

describe('PanaderiaBodyComponent', () => {
  let component: PanaderiaBodyComponent;
  let fixture: ComponentFixture<PanaderiaBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanaderiaBodyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PanaderiaBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
