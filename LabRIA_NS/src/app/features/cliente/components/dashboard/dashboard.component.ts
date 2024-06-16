import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class clienteDashboardComponent implements OnInit {
  itemCount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateItemCount();
  }

  updateItemCount(): void {
    this.itemCount = this.cartService.getCartItemCount();
  }

  openCartModal(): void {
    (document.getElementById('my_modal_3') as HTMLDialogElement).showModal();
  }
}