import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto-modal',
  template: `
    <dialog [id]="modalId" class="modal">
      <div class="modal-box" *ngIf="!loading && !error">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <figure class="flex items-center justify-center py-5">
          <img *ngIf="producto.imagen !== ''" class="rounded-lg" [src]="producto.imagen" alt="Imagen del producto" />
          <img *ngIf="producto.imagen == ''" class="rounded-lg" src="/assets/no-image.png" alt="Imagen del producto" />
        </figure>
        <div class="prose">
          <h1>{{producto?.nombre}}</h1>
          <p>{{producto?.descripcion}}</p>
          <h3 class="text-primary font-bold">Precio: &#36;{{producto.precio}} UYU</h3>
          <h3 class="font-bold">Ingredientes:</h3>
          <ul>
            <li *ngFor="let ingrediente of producto?.ingredientes">
              {{ingrediente}}
            </li>
          </ul>
          <h3 *ngIf="producto?.ingredientes.length == 0" class="text-center text-3xl m-0 p-0">Aire al parecer...</h3>
        </div>
      </div>
      <div class="modal-box" *ngIf="error">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div class="prose">
          <h1>Upss, parece que hubo un error!</h1>
          <p>No encontramos tu producto o hubo un problema en el camino, intenta nuevamente más tarde!</p>
        </div>
      </div>
    </dialog>
  `,
  styles: ``
})
export class ProductoModalComponent implements OnInit {
  @Input() modalId: number = -1;
  loading: boolean = true;
  error: boolean = false;
  producto: any;

  constructor(private ps: ProductoService) { }

  ngOnInit(): void {
    // getProductoById
    if (this.modalId !== -1) {
      this.ps.getProductoById(this.modalId).then((producto) => {
        this.producto = producto;
        this.loading = false;
        this.error = false;
        console.log("Producto", this.producto);
      }).catch((error) => {
        this.error = true;
        this.loading = false;
        console.error('Error fetching product in modal component', error);
      });
    } else {
      this.error = true;
      this.loading = false;
    }
  }
}
