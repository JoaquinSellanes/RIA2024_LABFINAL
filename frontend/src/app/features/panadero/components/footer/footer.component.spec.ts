import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanaderoFooterComponent } from './footer.component';

describe('PanaderoFooterComponent', () => {
  let component: PanaderoFooterComponent;
  let fixture: ComponentFixture<PanaderoFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanaderoFooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PanaderoFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
