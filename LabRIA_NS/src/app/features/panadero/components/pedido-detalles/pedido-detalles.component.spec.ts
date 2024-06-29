import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetallesComponent } from './pedido-detalles.component';

describe('PedidoDetallesComponent', () => {
  let component: PedidoDetallesComponent;
  let fixture: ComponentFixture<PedidoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidoDetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
